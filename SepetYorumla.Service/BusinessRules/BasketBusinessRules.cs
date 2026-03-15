using SepetYorumla.Core.Exceptions;
using SepetYorumla.DataAccess.Abstracts;
using SepetYorumla.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace SepetYorumla.Service.BusinessRules;

public class BasketBusinessRules(IBasketRepository _basketRepository, ICategoryRepository _categoryRepository)
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

  public void UserMustOwnBasketOrBeAdmin(Basket basket, Guid userId, string userRole)
  {
    if (basket.UserId != userId && userRole != "Admin")
    {
      throw new ForbiddenException("Bu sepeti silme yetkiniz bulunmamaktadır.");
    }
  }

  public void OnlyUserCanEditBasket(Basket basket, Guid userId)
  {
    if (basket.UserId != userId)
    {
      throw new ForbiddenException("Sepeti sadece sahibi düzenleyebilir.");
    }
  }

  public async Task ValidateCategoriesExistAsync(List<int> categoryIds, CancellationToken cancellationToken)
  {
    var distinctIds = categoryIds.Distinct().ToList();

    var count = await _categoryRepository.Query()
      .CountAsync(c => distinctIds.Contains(c.Id), cancellationToken);

    if (count != distinctIds.Count)
    {
      throw new BusinessException("Seçilen kategorilerden biri veya birkaçı geçersiz.");
    }
  }
}