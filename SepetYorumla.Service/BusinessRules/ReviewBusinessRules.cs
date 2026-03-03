using SepetYorumla.Core.Exceptions;
using SepetYorumla.DataAccess.Abstracts;
using SepetYorumla.Models.Entities;

namespace SepetYorumla.Service.BusinessRules;

public class ReviewBusinessRules(
  IReviewRepository _reviewRepository,
  IBasketRepository _basketRepository)
{
  public async Task<Review> GetReviewIfExistAsync(
    Guid id,
    Func<IQueryable<Review>, IQueryable<Review>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default)
  {
    var review = await _reviewRepository.GetByIdAsync(id, include, enableTracking, cancellationToken);

    if (review == null)
    {
      throw new NotFoundException($"{id} numaralı inceleme bulunamadı.");
    }

    return review;
  }

  public async Task BasketMustExistAsync(Guid basketId, CancellationToken cancellationToken = default)
  {
    var exists = await _basketRepository.AnyAsync(b => b.Id == basketId, cancellationToken);

    if (!exists)
    {
      throw new NotFoundException("Sepet bulunamadı.");
    }
  }

  public void UserMustOwnReviewOrBeAdmin(Review review, Guid userId, string userRole)
  {
    if (review.UserId != userId && userRole != "Admin")
    {
      throw new ForbiddenException("Bu incelemeyi silme yetkiniz bulunmamaktadır.");
    }
  }

  public void OnlyUserCanEditReview(Review review, Guid userId)
  {
    if (review.UserId != userId)
    {
      throw new ForbiddenException("İncelemeyi sadece sahibi düzenleyebilir.");
    }
  }
}