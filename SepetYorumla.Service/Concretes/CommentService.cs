using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using SepetYorumla.Core.Responses;
using SepetYorumla.DataAccess.Abstracts;
using SepetYorumla.Models.Dtos.Comments.Requests;
using SepetYorumla.Models.Dtos.Comments.Responses;
using SepetYorumla.Models.Entities;
using SepetYorumla.Models.Mapping;
using SepetYorumla.Service.Abstracts;
using SepetYorumla.Service.BusinessRules;
using System.Linq.Expressions;

namespace SepetYorumla.Service.Concretes;

public class CommentService(
  ICommentRepository _commentRepository,
  CommentBusinessRules _businessRules,
  GeneralMapper _mapper,
  IUnitOfWork _unitOfWork,
  IValidator<CreateCommentRequest> _createValidator,
  IValidator<UpdateCommentRequest> _updateValidator) : ICommentService
{
  public async Task<ReturnModel<List<CommentResponseDto>>> GetAllAsync(
    Expression<Func<Comment, bool>>? filter = null,
    Func<IQueryable<Comment>, IQueryable<Comment>>? include = null,
    Func<IQueryable<Comment>, IOrderedQueryable<Comment>>? orderBy = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default)
  {
    List<Comment> comments = await _commentRepository.GetAllAsync(
      filter,
      include: query => query.Include(c => c.User).Include(c => c.Basket),
      orderBy,
      enableTracking,
      withDeleted,
      cancellationToken);

    List<CommentResponseDto> response = _mapper.EntityToResponseDtoList(comments);

    return new ReturnModel<List<CommentResponseDto>>()
    {
      Success = true,
      Message = "Yorum listesi başarılı bir şekilde getirildi.",
      Data = response,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<CommentResponseDto>> GetAsync(
    Expression<Func<Comment, bool>> predicate,
    Func<IQueryable<Comment>, IQueryable<Comment>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default)
  {
    var comment = await _commentRepository.GetAsync(
      predicate,
      include: query => query.Include(c => c.User).Include(c => c.Basket),
      enableTracking,
      cancellationToken);

    if (comment == null)
    {
      return new ReturnModel<CommentResponseDto>
      {
        Success = true,
        Message = "Eşleşen yorum bulunamadı.",
        Data = null,
        StatusCode = 200
      };
    }

    var response = _mapper.EntityToResponseDto(comment);

    return new ReturnModel<CommentResponseDto>
    {
      Success = true,
      Message = "Yorum başarılı bir şekilde getirildi.",
      Data = response,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<CommentResponseDto>> GetByIdAsync(
    int id,
    Func<IQueryable<Comment>, IQueryable<Comment>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default)
  {
    Comment comment = await _businessRules.GetCommentIfExistAsync(
      id,
      include: query => query.Include(c => c.User).Include(c => c.Basket),
      enableTracking,
      cancellationToken);

    CommentResponseDto response = _mapper.EntityToResponseDto(comment);

    return new ReturnModel<CommentResponseDto>()
    {
      Success = true,
      Message = $"{id} numaralı yorum başarılı bir şekilde getirildi.",
      Data = response,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<CreatedCommentResponseDto>> AddAsync(CreateCommentRequest request, Guid userId, CancellationToken cancellationToken = default)
  {
    var validationResult = await _createValidator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    await _businessRules.BasketMustExistAsync(request.BasketId, cancellationToken);

    Comment createdComment = _mapper.CreateToEntity(request);
    createdComment.UserId = userId;

    await _commentRepository.AddAsync(createdComment, cancellationToken);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    CreatedCommentResponseDto response = _mapper.EntityToCreatedResponseDto(createdComment);

    return new ReturnModel<CreatedCommentResponseDto>()
    {
      Success = true,
      Message = "Yorum başarılı bir şekilde eklendi.",
      Data = response,
      StatusCode = 201
    };
  }

  public async Task<ReturnModel<NoData>> RemoveAsync(int id, Guid userId, string userRole, CancellationToken cancellationToken = default)
  {
    Comment comment = await _businessRules.GetCommentIfExistAsync(id, enableTracking: true, cancellationToken: cancellationToken);

    _businessRules.UserMustOwnCommentOrBeAdmin(comment, userId, userRole);

    _commentRepository.Delete(comment);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<NoData>()
    {
      Success = true,
      Message = "Yorum başarılı bir şekilde silindi.",
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<NoData>> UpdateAsync(UpdateCommentRequest request, Guid userId, CancellationToken cancellationToken = default)
  {
    var validationResult = await _updateValidator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    Comment existingComment = await _businessRules.GetCommentIfExistAsync(request.Id, enableTracking: true, cancellationToken: cancellationToken);

    _businessRules.OnlyUserCanEditComment(existingComment, userId);

    _mapper.UpdateEntityFromRequest(request, existingComment);

    _commentRepository.Update(existingComment);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<NoData>()
    {
      Success = true,
      Message = "Yorum başarılı bir şekilde güncellendi.",
      StatusCode = 200
    };
  }
}