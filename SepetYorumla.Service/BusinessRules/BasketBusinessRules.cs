using SepetYorumla.Core.Exceptions;
using SepetYorumla.DataAccess.Abstracts;
using SepetYorumla.Models.Entities;

namespace SepetYorumla.Service.BusinessRules;

public class BasketBusinessRules(IBasketRepository _basketRepository, IUserRepository _userRepository)
{
  public async Task<Basket> GetBasketIfExistAsync(
    Guid id,
    Func<IQueryable<Basket>, IQueryable<Basket>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default)
  {
    var basket = await _basketRepository.GetByIdAsync(id, include, enableTracking, cancellationToken);

    if (basket == null)
    {
      throw new NotFoundException($"{id} numaralı sepet bulunamadı.");
    }

    return basket;
  }

  public async Task UserMustExistAsync(Guid userId, CancellationToken cancellationToken = default)
  {
    var exists = await _userRepository.AnyAsync(u => u.Id == userId, cancellationToken);

    if (!exists)
    {
      throw new NotFoundException($"{userId} numaralı kullanıcı bulunamadı.");
    }
  }
}