using FluentValidation;
using SepetYorumla.Core.Responses;
using SepetYorumla.DataAccess.Abstracts;
using SepetYorumla.Models.Dtos.Categories.Requests;
using SepetYorumla.Models.Dtos.Categories.Responses;
using SepetYorumla.Models.Entities;
using SepetYorumla.Models.Mapping;
using SepetYorumla.Service.Abstracts;
using SepetYorumla.Service.BusinessRules;
using System.Linq.Expressions;

namespace SepetYorumla.Service.Concretes;

public class CategoryService(
  ICategoryRepository _categoryRepository,
  CategoryBusinessRules _businessRules,
  GeneralMapper _mapper,
  IUnitOfWork _unitOfWork,
  IValidator<CreateCategoryRequest> _createValidator,
  IValidator<UpdateCategoryRequest> _updateValidator) : ICategoryService
{
  public async Task<ReturnModel<List<CategoryResponseDto>>> GetAllAsync(
    Expression<Func<Category, bool>>? filter = null,
    Func<IQueryable<Category>, IQueryable<Category>>? include = null,
    Func<IQueryable<Category>, IOrderedQueryable<Category>>? orderBy = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default)
  {
    List<Category> categories = await _categoryRepository.GetAllAsync(
      filter,
      include,
      orderBy,
      enableTracking,
      withDeleted,
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

  public async Task<ReturnModel<CategoryResponseDto>> GetByIdAsync(
    int id,
    Func<IQueryable<Category>, IQueryable<Category>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default)
  {
    Category category = await _businessRules.GetCategoryIfExistAsync(id, include, enableTracking, cancellationToken);

    CategoryResponseDto response = _mapper.EntityToResponseDto(category);

    return new ReturnModel<CategoryResponseDto>()
    {
      Success = true,
      Message = $"{id} numaralı kategori başarılı bir şekilde getirildi.",
      Data = response,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<CategoryResponseDto>> AddAsync(CreateCategoryRequest request, CancellationToken cancellationToken = default)
  {
    var validationResult = await _createValidator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    await _businessRules.NameMustBeUniqueAsync(request.Name, cancellationToken);

    Category createdCategory = _mapper.CreateToEntity(request);

    await _categoryRepository.AddAsync(createdCategory, cancellationToken);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    CategoryResponseDto response = _mapper.EntityToResponseDto(createdCategory);

    return new ReturnModel<CategoryResponseDto>()
    {
      Success = true,
      Message = "Kategori başarılı bir şekilde eklendi.",
      Data = response,
      StatusCode = 201
    };
  }

  public async Task<ReturnModel<NoData>> RemoveAsync(int id, CancellationToken cancellationToken = default)
  {
    Category category = await _businessRules.GetCategoryIfExistAsync(id, enableTracking: true, cancellationToken: cancellationToken);

    _categoryRepository.Delete(category);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<NoData>()
    {
      Success = true,
      Message = "Kategori başarılı bir şekilde silindi.",
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<NoData>> UpdateAsync(UpdateCategoryRequest request, CancellationToken cancellationToken = default)
  {
    var validationResult = await _updateValidator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    Category existingCategory = await _businessRules.GetCategoryIfExistAsync(request.Id, enableTracking: true, cancellationToken: cancellationToken);

    _mapper.UpdateEntityFromRequest(request, existingCategory);

    _categoryRepository.Update(existingCategory);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<NoData>()
    {
      Success = true,
      Message = "Kategori başarılı bir şekilde güncellendi.",
      StatusCode = 200
    };
  }
}
