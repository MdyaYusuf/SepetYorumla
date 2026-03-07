using Microsoft.AspNetCore.Http;
using SepetYorumla.Core.Exceptions;
using SepetYorumla.DataAccess.Abstracts;
using SepetYorumla.Models.Entities;

namespace SepetYorumla.Service.BusinessRules;

public class BasketBusinessRules(IBasketRepository _basketRepository)
{
  private readonly string[] _allowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];
  private const long _maxFileSize = 5 * 1024 * 1024;

  public void ValidateProductImage(IFormFile file)
  {
    var extension = Path.GetExtension(file.FileName).ToLower();

    if (!_allowedExtensions.Contains(extension))
    {
      throw new BusinessException($"Geçersiz dosya formatı. İzin verilenler: {string.Join(", ", _allowedExtensions)}");
    }

    if (file.Length > _maxFileSize)
    {
      throw new BusinessException("Dosya boyutu 5MB'dan büyük olamaz.");
    }
  }

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
}