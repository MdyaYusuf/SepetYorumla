using SepetYorumla.Core.Exceptions;
using SepetYorumla.DataAccess.Abstracts;
using SepetYorumla.Models.Entities;

namespace SepetYorumla.Service.BusinessRules;

public class ProductBusinessRules(IProductRepository _productRepository, ICategoryRepository _categoryRepository)
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

  public async Task NameMustBeUniqueAsync(string name, CancellationToken cancellationToken = default)
  {
    var exists = await _productRepository.AnyAsync(x => x.Name == name, cancellationToken);

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
}
