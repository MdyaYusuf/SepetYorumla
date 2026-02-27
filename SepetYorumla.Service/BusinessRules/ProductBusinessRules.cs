using SepetYorumla.Core.Exceptions;
using SepetYorumla.DataAccess.Abstracts;
using SepetYorumla.Models.Entities;

namespace SepetYorumla.Service.BusinessRules;

public class ProductBusinessRules(
  IProductRepository _productRepository,
  ICategoryRepository _categoryRepository,
  IBasketRepository _basketRepository)
{
  public async Task<Product> GetProductIfExistAsync(
    Guid id,
    Func<IQueryable<Product>, IQueryable<Product>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default)
  {
    var product = await _productRepository.GetByIdAsync(id, include, enableTracking, cancellationToken);

    if (product == null)
    {
      throw new NotFoundException($"{id} numaralı ürün bulunamadı.");
    }

    return product;
  }

  public async Task ProductNameMustBeUniqueAsync(string name, Guid? id = null, CancellationToken cancellationToken = default)
  {
    var exists = await _productRepository.AnyAsync(p => p.Name == name && (id == null || p.Id != id), cancellationToken);

    if (exists)
    {
      throw new BusinessException("Ürün için benzersiz bir isim kullanılmalıdır.");
    }
  }

  public async Task CategoryMustExistAsync(int categoryId, CancellationToken cancellationToken = default)
  {
    var exists = await _categoryRepository.AnyAsync(x => x.Id == categoryId, cancellationToken);

    if (!exists)
    {
      throw new NotFoundException($"{categoryId} numaralı kategori bulunamadı.");
    }
  }

  public async Task BasketMustExistAsync(Guid basketId, CancellationToken cancellationToken = default)
  {
    var exists = await _basketRepository.AnyAsync(x => x.Id == basketId, cancellationToken);

    if (!exists)
    {
      throw new NotFoundException($"{basketId} numaralı sepet bulunamadı.");
    }
  }
}
