using SepetYorumla.Core.Responses;
using SepetYorumla.Models.Dtos.Categories.Requests;
using SepetYorumla.Models.Dtos.Categories.Responses;
using SepetYorumla.Models.Entities;
using System.Linq.Expressions;

namespace SepetYorumla.Service.Abstracts;

public interface ICategoryService
{
  Task<ReturnModel<List<CategoryResponseDto>>> GetAllAsync(
    Expression<Func<Category, bool>>? filter = null,
    Func<IQueryable<Category>, IQueryable<Category>>? include = null,
    Func<IQueryable<Category>, IOrderedQueryable<Category>>? orderBy = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<CategoryResponseDto>> GetAsync(
    Expression<Func<Category, bool>> predicate,
    Func<IQueryable<Category>, IQueryable<Category>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<CategoryResponseDto>> GetByIdAsync(
    int id,
    Func<IQueryable<Category>, IQueryable<Category>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<CategoryResponseDto>> AddAsync(
    CreateCategoryRequest request,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<NoData>> RemoveAsync(
    int id,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<NoData>> UpdateAsync(
    UpdateCategoryRequest request,
    CancellationToken cancellationToken = default);
}
