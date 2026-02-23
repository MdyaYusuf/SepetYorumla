using SepetYorumla.Core.Exceptions;
using SepetYorumla.DataAccess.Abstracts;
using SepetYorumla.Models.Entities;

namespace SepetYorumla.Service.BusinessRules;

public class CategoryBusinessRules(ICategoryRepository _categoryRepository)
{
  public async Task<Category> GetCategoryIfExistAsync(
    int id,
    Func<IQueryable<Category>, IQueryable<Category>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default)
  {
    var category = await _categoryRepository.GetByIdAsync(id, include, enableTracking, cancellationToken);

    if (category == null)
    {
      throw new NotFoundException($"{id} numaralı kategori bulunamadı.");
    }

    return category;
  }

  public async Task NameMustBeUniqueAsync(string name, CancellationToken cancellationToken = default)
  {
    var exists = await _categoryRepository.AnyAsync(x => x.Name == name, cancellationToken);

    if (exists)
    {
      throw new BusinessException("Kategori için benzersiz bir isim kullanılmalıdır.");
    }
  }
}
