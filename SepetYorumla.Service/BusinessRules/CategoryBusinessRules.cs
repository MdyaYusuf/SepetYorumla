using SepetYorumla.Core.Exceptions;
using SepetYorumla.DataAccess.Abstracts;
using SepetYorumla.Models.Entities;

namespace SepetYorumla.Service.BusinessRules;

public class CategoryBusinessRules(ICategoryRepository _categoryRepository)
{
  public async Task<Category> GetCategoryIfExistAsync(int id)
  {
    var category = await _categoryRepository.GetByIdAsync(id);

    if (category == null)
    {
      throw new NotFoundException($"{id} numaralı kategori bulunamadı.");
    }

    return category;
  }

  public async Task IsNameUniqueAsync(string name)
  {
    var category = await _categoryRepository.GetByNameAsync(name);

    if (category != null)
    {
      throw new BusinessException("Kategori için benzersiz bir isim kullanılmalıdır.");
    }
  }
}
