using FluentValidation;
using Microsoft.EntityFrameworkCore;
using SepetYorumla.Core.Responses;
using SepetYorumla.DataAccess.Abstracts;
using SepetYorumla.Models.Dtos.Reviews.Requests;
using SepetYorumla.Models.Dtos.Reviews.Responses;
using SepetYorumla.Models.Entities;
using SepetYorumla.Models.Mapping;
using SepetYorumla.Service.Abstracts;
using SepetYorumla.Service.BusinessRules;
using System.Linq.Expressions;

namespace SepetYorumla.Service.Concretes;

public class ReviewService(
  IReviewRepository _reviewRepository,
  ReviewBusinessRules _businessRules,
  GeneralMapper _mapper,
  IUnitOfWork _unitOfWork,
  IValidator<UpsertReviewRequest> _upsertValidator) : IReviewService
{
  public async Task<ReturnModel<List<ReviewResponseDto>>> GetAllAsync(
    Expression<Func<Review, bool>>? filter = null,
    Func<IQueryable<Review>, IQueryable<Review>>? include = null,
    Func<IQueryable<Review>, IOrderedQueryable<Review>>? orderBy = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default)
  {
    var reviews = await _reviewRepository.GetAllAsync(
      filter,
      include: query => query.Include(r => r.User).Include(r => r.Basket).ThenInclude(b => b.Products),
      orderBy,
      enableTracking,
      withDeleted,
      cancellationToken);

    var response = _mapper.EntityToResponseDtoList(reviews);

    return new ReturnModel<List<ReviewResponseDto>>()
    {
      Success = true,
      Message = "İncelemeler başarıyla listelendi.",
      Data = response,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<ReviewResponseDto>> GetAsync(
    Expression<Func<Review, bool>> predicate,
    Func<IQueryable<Review>, IQueryable<Review>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default)
  {
    var review = await _reviewRepository.GetAsync(
      predicate,
      include: query => query.Include(r => r.User).Include(r => r.Basket).ThenInclude(b => b.Products),
      enableTracking,
      cancellationToken);

    if (review == null)
    {
      return new ReturnModel<ReviewResponseDto>()
      {
        Success = true,
        Message = "Eşleşen inceleme bulunamadı.",
        Data = null,
        StatusCode = 200
      };
    }

    var response = _mapper.EntityToResponseDto(review);

    return new ReturnModel<ReviewResponseDto>()
    {
      Success = true,
      Message = "İnceleme başarıyla getirildi.",
      Data = response,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<ReviewResponseDto>> GetByIdAsync(
    Guid id,
    Func<IQueryable<Review>, IQueryable<Review>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default)
  {
    var review = await _businessRules.GetReviewIfExistAsync(
      id,
      include: query => query.Include(r => r.User).Include(r => r.Basket).ThenInclude(b => b.Products),
      enableTracking,
      cancellationToken);

    var response = _mapper.EntityToResponseDto(review);

    return new ReturnModel<ReviewResponseDto>()
    {
      Success = true,
      Message = $"{id} numaralı inceleme başarıyla getirildi.",
      Data = response,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<UpsertedReviewResponseDto>> UpsertAsync(UpsertReviewRequest request, Guid userId, CancellationToken cancellationToken = default)
  {
    var validationResult = await _upsertValidator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    await _businessRules.BasketMustExistAsync(request.BasketId, cancellationToken);

    var existingReview = await _reviewRepository.GetAsync(
        r => r.UserId == userId && r.BasketId == request.BasketId,
        enableTracking: true,
        cancellationToken: cancellationToken
    );

    if (existingReview != null)
    {
      if (request.StarRating.HasValue)
      {
        existingReview.StarRating = request.StarRating;
      }

      if (request.IsThumbsUp.HasValue)
      {
        existingReview.IsThumbsUp = request.IsThumbsUp;
      }

      existingReview.UpdatedDate = DateTime.Now;

      _reviewRepository.Update(existingReview);
      await _unitOfWork.SaveChangesAsync(cancellationToken);

      UpsertedReviewResponseDto updatedResponse = _mapper.EntityToUpsertedResponseDto(existingReview);

      return new ReturnModel<UpsertedReviewResponseDto>()
      {
        Success = true,
        Message = "Değerlendirmeniz güncellendi.",
        Data = updatedResponse,
        StatusCode = 200
      };
    }

    Review createdReview = _mapper.UpsertToEntity(request);
    createdReview.UserId = userId;
    createdReview.StarRating = request.StarRating;

    await _reviewRepository.AddAsync(createdReview, cancellationToken);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    UpsertedReviewResponseDto createdResponse = _mapper.EntityToUpsertedResponseDto(createdReview);

    return new ReturnModel<UpsertedReviewResponseDto>()
    {
      Success = true,
      Message = "Değerlendirmeniz alınmıştır.",
      Data = createdResponse,
      StatusCode = 201
    };
  }

  public async Task<ReturnModel<NoData>> RemoveAsync(Guid id, Guid userId, string userRole, CancellationToken cancellationToken = default)
  {
    var review = await _businessRules.GetReviewIfExistAsync(id, enableTracking: true, cancellationToken: cancellationToken);

    _businessRules.UserMustOwnReviewOrBeAdmin(review, userId, userRole);

    _reviewRepository.Delete(review);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<NoData>()
    {
      Success = true,
      Message = "İnceleme başarıyla silindi.",
      StatusCode = 200
    };
  }
}