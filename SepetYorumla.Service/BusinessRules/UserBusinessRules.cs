using SepetYorumla.Core.Exceptions;
using SepetYorumla.DataAccess.Abstracts;
using SepetYorumla.Models.Entities;

namespace SepetYorumla.Service.BusinessRules;

public class UserBusinessRules(IUserRepository _userRepository)
{
  public async Task<User> GetUserIfExistAsync(
    Guid id,
    Func<IQueryable<User>, IQueryable<User>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default)
  {
    var user = await _userRepository.GetByIdAsync(id, include, enableTracking, cancellationToken);

    if (user == null)
    {
      throw new NotFoundException($"{id} numaralı kullanıcı bulunamadı.");
    }

    return user;
  }

  public async Task EmailMustBeUniqueAsync(string email, Guid? id = null, CancellationToken cancellationToken = default)
  {
    var exists = await _userRepository.AnyAsync(u => u.Email == email && (id == null || u.Id != id), cancellationToken);

    if (exists)
    {
      throw new BusinessException("Bu eposta adresi zaten kullanımda.");
    }
  }

  public async Task UsernameMustBeUniqueAsync(string username, Guid? id = null, CancellationToken cancellationToken = default)
  {
    var exists = await _userRepository.AnyAsync(u => u.Username == username && (id == null || u.Id != id), cancellationToken);

    if (exists)
    {
      throw new BusinessException("Bu kullanıcı adı zaten alınmış.");
    }
  }
}