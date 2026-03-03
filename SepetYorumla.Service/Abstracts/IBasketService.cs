using SepetYorumla.Core.Responses;
using SepetYorumla.Models.Dtos.Baskets.Requests;
using SepetYorumla.Models.Dtos.Baskets.Responses;
using SepetYorumla.Models.Entities;
using System.Linq.Expressions;

namespace SepetYorumla.Service.Abstracts;

public interface IBasketService
{
  Task<ReturnModel<List<BasketResponseDto>>> GetAllAsync(
    Expression<Func<Basket, bool>>? filter = null,
    Func<IQueryable<Basket>, IQueryable<Basket>>? include = null,
    Func<IQueryable<Basket>, IOrderedQueryable<Basket>>? orderBy = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<BasketResponseDto>> GetAsync(
    Expression<Func<Basket, bool>> predicate,
    Func<IQueryable<Basket>, IQueryable<Basket>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<BasketResponseDto>> GetByIdAsync(
    Guid id,
    Func<IQueryable<Basket>, IQueryable<Basket>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<CreatedBasketResponseDto>> AddAsync(
    CreateBasketRequest request,
    Guid userId,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<NoData>> RemoveAsync(
    Guid id,
    Guid userId,
    string userRole,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<NoData>> UpdateAsync(
    UpdateBasketRequest request,
    Guid userId,
    CancellationToken cancellationToken = default);
}
