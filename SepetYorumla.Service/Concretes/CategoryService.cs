using SepetYorumla.Core.Responses;
using SepetYorumla.DataAccess.Abstracts;
using SepetYorumla.Models.Dtos.Categories.Requests;
using SepetYorumla.Models.Dtos.Categories.Responses;
using SepetYorumla.Models.Entities;
using SepetYorumla.Models.Mapping;
using SepetYorumla.Service.BusinessRules;
using System.Linq.Expressions;

namespace SepetYorumla.Service.Concretes;

public class CategoryService(ICategoryRepository _categoryRepository, CategoryBusinessRules _businessRules, GeneralMapper _mapper, IUnitOfWork _unitOfWork)
{
  public async Task<ReturnModel<List<CategoryResponseDto>>> GetAllAsync(
    Func<IQueryable<Category>, IQueryable<Category>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    Expression<Func<Category, bool>>? filter = null,
    Func<IQueryable<Category>, IOrderedQueryable<Category>>? orderBy = null,
    CancellationToken cancellationToken = default)
  {
    List<Category> categories = await _categoryRepository.GetAllAsync(
      enableTracking,
      withDeleted,
      include,
      filter,
      orderBy,
      cancellationToken);

    List<CategoryResponseDto> response = _mapper.EntityToResponseDtoList(categories);

    return new ReturnModel<List<CategoryResponseDto>>()
    {
      Success = true,
      Message = "Kategori listesi başarılı bir şekilde getirildi.",
      Data = response,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<CategoryResponseDto>> GetByIdAsync(int id)
  {
    Category category = await _businessRules.GetCategoryIfExistAsync(id);

    CategoryResponseDto response = _mapper.EntityToResponseDto(category);

    return new ReturnModel<CategoryResponseDto>()
    {
      Success = true,
      Message = $"{id} numaralı kategori başarılı bir şekilde getirildi.",
      Data = response,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<CategoryResponseDto>> AddAsync(CreateCategoryRequest request)
  {
    await _businessRules.IsNameUniqueAsync(request.Name);

    Category createdCategory = _mapper.CreateToEntity(request);

    await _categoryRepository.AddAsync(createdCategory);
    await _unitOfWork.SaveChangesAsync();

    CategoryResponseDto response = _mapper.EntityToResponseDto(createdCategory);

    return new ReturnModel<CategoryResponseDto>()
    {
      Success = true,
      Message = "Kategori başarılı bir şekilde eklendi.",
      Data = response,
      StatusCode = 201
    };
  }

  public async Task<ReturnModel<NoData>> RemoveAsync(int id)
  {
    Category category = await _businessRules.GetCategoryIfExistAsync(id);

    _categoryRepository.Delete(category);
    await _unitOfWork.SaveChangesAsync();

    return new ReturnModel<NoData>()
    {
      Success = true,
      Message = "Kategori başarılı bir şekilde silindi.",
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<NoData>> UpdateAsync(UpdateCategoryRequest request)
  {
    Category existingCategory = await _businessRules.GetCategoryIfExistAsync(request.Id);

    _mapper.UpdateEntityFromRequest(request, existingCategory);

    _categoryRepository.Update(existingCategory);
    await _unitOfWork.SaveChangesAsync();

    return new ReturnModel<NoData>()
    {
      Success = true,
      Message = "Kategori başarılı bir şekilde güncellendi.",
      StatusCode = 200
    };
  }
}
