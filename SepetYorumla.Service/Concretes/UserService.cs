using FluentValidation;
using Microsoft.EntityFrameworkCore;
using SepetYorumla.Core.Responses;
using SepetYorumla.Core.Security;
using SepetYorumla.DataAccess.Abstracts;
using SepetYorumla.Models.Dtos.Users.Requests;
using SepetYorumla.Models.Dtos.Users.Responses;
using SepetYorumla.Models.Entities;
using SepetYorumla.Models.Mapping;
using SepetYorumla.Service.Abstracts;
using SepetYorumla.Service.BusinessRules;
using SepetYorumla.Service.Helpers;
using System.Linq.Expressions;

namespace SepetYorumla.Service.Concretes;

public class UserService(
    IUserRepository _userRepository,
    UserBusinessRules _businessRules,
    GeneralMapper _mapper,
    IUnitOfWork _unitOfWork,
    IValidator<UpdateUserRequest> _updateValidator,
    IValidator<ChangePasswordRequest> _passwordValidator) : IUserService
{
  public async Task<ReturnModel<List<UserResponseDto>>> GetAllAsync(
    Expression<Func<User, bool>>? filter = null,
    Func<IQueryable<User>, IQueryable<User>>? include = null,
    Func<IQueryable<User>, IOrderedQueryable<User>>? orderBy = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default)
  {
    List<User> users = await _userRepository.GetAllAsync(
      include: u => u.Include(u => u.Role),
      cancellationToken: cancellationToken);

    List<UserResponseDto> response = _mapper.EntityToResponseDtoList(users);

    return new ReturnModel<List<UserResponseDto>>()
    {
      Success = true,
      Message = "Kullanıcı listesi başarıyla getirildi.",
      Data = response,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<UserResponseDto>> GetAsync(
      Expression<Func<User, bool>> predicate,
      Func<IQueryable<User>, IQueryable<User>>? include = null,
      bool enableTracking = false,
      CancellationToken cancellationToken = default)
  {
    var user = await _userRepository.GetAsync(
      predicate: predicate,
      include: u => u.Include(u => u.Role),
      enableTracking: enableTracking,
      cancellationToken: cancellationToken);

    if (user == null)
    {
      return new ReturnModel<UserResponseDto>()
      {
        Success = true,
        Message = "Eşleşen kullanıcı bulunamadı.",
        Data = null,
        StatusCode = 200
      };
    }

    return new ReturnModel<UserResponseDto>()
    {
      Success = true,
      Message = "Kullanıcı başarıyla getirildi.",
      Data = _mapper.EntityToResponseDto(user),
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<UserResponseDto>> GetByIdAsync(
    Guid id,
    Func<IQueryable<User>, IQueryable<User>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default)
  {
    User user = await _businessRules.GetUserIfExistAsync(
      id: id,
      include: u => u.Include(u => u.Role),
      enableTracking: enableTracking,
      cancellationToken: cancellationToken);

    return new ReturnModel<UserResponseDto>()
    {
      Success = true,
      Message = $"{id} numaralı kullanıcı başarıyla getirildi.",
      Data = _mapper.EntityToResponseDto(user),
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<ProfileResponseDto>> GetByUsernameAsync(string username, Guid? currentUserId = null, CancellationToken cancellationToken = default)
  {
    var user = await _userRepository.Query()
      .Include(u => u.Baskets).ThenInclude(b => b.Reviews)
      .Include(u => u.Baskets).ThenInclude(b => b.Products).ThenInclude(p => p.Category)
      .Include(u => u.Baskets).ThenInclude(b => b.Comments)
      .Include(u => u.Followers)
      .Include(u => u.Following)
      .Include(u => u.Comments).ThenInclude(c => c.Basket)
      .FirstOrDefaultAsync(u => u.Username == username, cancellationToken);

    if (user == null)
    {
      return new ReturnModel<ProfileResponseDto>()
      {
        Data = null,
        Success = false,
        Message = "Kullanıcı bulunamadı.",
        StatusCode = 404
      };
    }

    bool isFollowing = currentUserId.HasValue && user.Followers.Any(f => f.FollowerId == currentUserId.Value);

    var topBasketsEntities = user.Baskets
      .OrderByDescending(b => b.Reviews.Count(r => r.IsThumbsUp == true))
      .Take(3)
      .ToList();

    var basketDtos = _mapper.EntityToResponseDtoList(topBasketsEntities);

    for (int i = 0; i < topBasketsEntities.Count; i++)
    {
      BasketMappingHelper.PopulateSummaryFields(topBasketsEntities[i], basketDtos[i]);
    }

    var recentComments = user.Comments
      .OrderByDescending(c => c.CreatedDate)
      .Take(3)
      .Select(c => new CommentListItemResponseDto(
        c.BasketId,
        c.Basket.Title,
        c.Text,
        c.CreatedDate))
      .ToList();

    var response = new ProfileResponseDto(
      user.Id,
      user.Username,
      user.ProfileImageUrl,
      user.Bio,
      user.CreatedDate,
      user.Followers.Count,
      user.Following.Count,
      user.Baskets.SelectMany(b => b.Comments).Count(),
      user.Baskets.SelectMany(b => b.Reviews).Count(r => r.IsThumbsUp == true),
      isFollowing,
      basketDtos,
      recentComments);

    return new ReturnModel<ProfileResponseDto>()
    {
      Data = response,
      Success = true,
      Message = "Profil başarıyla getirildi.",
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<NoData>> RemoveAsync(Guid id, Guid currentUserId, string userRole, CancellationToken cancellationToken = default)
  {
    _businessRules.UserMustBeOwnerOrAdmin(id, currentUserId, userRole);

    User user = await _businessRules.GetUserIfExistAsync(id, enableTracking: true, cancellationToken: cancellationToken);

    string? imagePathToDelete = user.ProfileImageUrl;

    _userRepository.Delete(user);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    FileHelper.DeleteImageFromDisk(imagePathToDelete);

    return new ReturnModel<NoData>()
    {
      Success = true,
      Message = "Kullanıcı başarıyla silindi.",
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<NoData>> UpdateAsync(UpdateUserRequest request, Guid currentUserId, CancellationToken cancellationToken = default)
  {
    var validationResult = await _updateValidator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    User existingUser = await _businessRules.GetUserIfExistAsync(currentUserId, enableTracking: true, cancellationToken: cancellationToken);

    if (existingUser.Email != request.Email)
    {
      await _businessRules.EmailMustBeUniqueAsync(request.Email, existingUser.Id, cancellationToken);
    }

    if (existingUser.Username != request.Username)
    {
      await _businessRules.UsernameMustBeUniqueAsync(request.Username, existingUser.Id, cancellationToken);
    }

    _mapper.UpdateEntityFromRequest(request, existingUser);

    existingUser.ProfileImageUrl = await FileHelper.ReplaceImageOnDisk(
      request.ImageFile,
      existingUser.ProfileImageUrl,
      "profiles",
      request.Username,
      cancellationToken);

    _userRepository.Update(existingUser);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<NoData>()
    {
      Success = true,
      Message = "Profil başarıyla güncellendi.",
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<NoData>> ChangePasswordAsync(ChangePasswordRequest request, Guid userId, CancellationToken cancellationToken = default)
  {
    var validationResult = await _passwordValidator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    User user = await _businessRules.GetUserIfExistAsync(userId, enableTracking: true, cancellationToken: cancellationToken);

    _businessRules.PasswordMustMatch(request.CurrentPassword, user.PasswordHash, user.PasswordKey);

    HashingHelper.CreatePasswordHash(request.NewPassword, out string newHash, out string newKey);
    user.PasswordHash = newHash;
    user.PasswordKey = newKey;

    _userRepository.Update(user);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<NoData>()
    {
      Success = true,
      Message = "Şifreniz başarıyla güncellendi.",
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<UserActivityStatsDto>> GetProfileStatsAsync(Guid userId, CancellationToken cancellationToken = default)
  {
    await _businessRules.UserIdMustExist(userId, cancellationToken);

    var stats = await _userRepository.Query()
      .Where(u => u.Id == userId)
      .Select(u => new UserActivityStatsDto(
        u.Baskets.Count(),
        u.Reviews.Count(r => r.IsThumbsUp == true),
        u.SavedBaskets.Count(),
        u.Comments.Count(),
        u.CreatedDate
      ))
      .FirstAsync(cancellationToken);

    return new ReturnModel<UserActivityStatsDto>()
    {
      Data = stats,
      Success = true,
      StatusCode = 200,
      Message = "İstatistikler başarıyla getirildi."
    };
  }

  public async Task<ReturnModel<List<UserListItemResponseDto>>> GetPopularUsersAsync(int count, CancellationToken cancellationToken = default)
  {
    var popularUsers = await _userRepository.Query()
      .OrderByDescending(u => u.Followers.Count)
      .Take(count)
      .Select(u => new UserListItemResponseDto(
        u.Id,
        u.Username,
        u.ProfileImageUrl))
      .ToListAsync(cancellationToken);

    return new ReturnModel<List<UserListItemResponseDto>>
    {
      Data = popularUsers,
      Success = true,
      Message = "Popüler kullanıcılar başarıyla getirildi.",
      StatusCode = 200
    };
  }
}