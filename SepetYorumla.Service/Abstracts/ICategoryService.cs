using SepetYorumla.Core.Entities;
using SepetYorumla.Core.Responses;
using SepetYorumla.Models.Dtos.Categories.Requests;
using SepetYorumla.Models.Dtos.Categories.Responses;
using SepetYorumla.Models.Entities;
using System.Linq.Expressions;

namespace SepetYorumla.Service.Abstracts;

public interface ICategoryService
{
  Task<ReturnModel<List<CategoryResponseDto>>> GetAllAsync(
    bool enableTracking = false,
    bool withDeleted = false,
    Func<IQueryable<Category>, IQueryable<Category>>? include = null,
    Expression<Func<Category, bool>>? filter = null,
    Func<IQueryable<Category>, IOrderedQueryable<Category>>? orderBy = null,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<CategoryResponseDto>> GetByIdAsync(int id);
  Task<ReturnModel<CategoryResponseDto>> AddAsync(CreateCategoryRequest request);
  Task<ReturnModel<NoData>> RemoveAsync(int id);
  Task<ReturnModel<NoData>> UpdateAsync(UpdateCategoryRequest request);
}
