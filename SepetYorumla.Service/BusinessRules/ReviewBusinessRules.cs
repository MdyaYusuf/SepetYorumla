using SepetYorumla.Core.Exceptions;
using SepetYorumla.DataAccess.Abstracts;
using SepetYorumla.Models.Entities;

namespace SepetYorumla.Service.BusinessRules;

public class ReviewBusinessRules(
  IReviewRepository _reviewRepository,
  IBasketRepository _basketRepository,
  IUserRepository _userRepository)
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

  public async Task UserMustExistAsync(Guid userId, CancellationToken cancellationToken = default)
  {
    var exists = await _userRepository.AnyAsync(u => u.Id == userId, cancellationToken);

    if (!exists)
    {
      throw new NotFoundException("Kullanıcı bulunamadı.");
    }
  }

  public async Task BasketMustExistAsync(Guid basketId, CancellationToken cancellationToken = default)
  {
    var exists = await _basketRepository.AnyAsync(b => b.Id == basketId, cancellationToken);

    if (!exists)
    {
      throw new NotFoundException("Sepet bulunamadı.");
    }
  }
}