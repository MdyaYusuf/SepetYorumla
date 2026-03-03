using SepetYorumla.Core.Responses;
using SepetYorumla.Models.Dtos.Products.Requests;
using SepetYorumla.Models.Dtos.Products.Responses;
using SepetYorumla.Models.Entities;
using System.Linq.Expressions;

namespace SepetYorumla.Service.Abstracts;

public interface IProductService
{
  Task<ReturnModel<List<ProductResponseDto>>> GetAllAsync(
    Expression<Func<Product, bool>>? filter = null,
    Func<IQueryable<Product>, IQueryable<Product>>? include = null,
    Func<IQueryable<Product>, IOrderedQueryable<Product>>? orderBy = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<ProductResponseDto>> GetAsync(
    Expression<Func<Product, bool>> predicate,
    Func<IQueryable<Product>, IQueryable<Product>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<ProductResponseDto>> GetByIdAsync(
    Guid id,
    Func<IQueryable<Product>, IQueryable<Product>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<CreatedProductResponseDto>> AddAsync(
    CreateProductRequest request,
    Guid userId,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<NoData>> RemoveAsync(
    Guid id,
    Guid userId,
    string userRole,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<NoData>> UpdateAsync(
    UpdateProductRequest request,
    Guid userId,
    CancellationToken cancellationToken = default);
}
