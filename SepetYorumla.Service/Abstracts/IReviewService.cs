using SepetYorumla.Core.Responses;
using SepetYorumla.Models.Dtos.Reviews.Requests;
using SepetYorumla.Models.Dtos.Reviews.Responses;
using SepetYorumla.Models.Entities;
using System.Linq.Expressions;

namespace SepetYorumla.Service.Abstracts;

public interface IReviewService
{
  Task<ReturnModel<List<ReviewResponseDto>>> GetAllAsync(
    Expression<Func<Review, bool>>? filter = null,
    Func<IQueryable<Review>, IQueryable<Review>>? include = null,
    Func<IQueryable<Review>, IOrderedQueryable<Review>>? orderBy = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<ReviewResponseDto>> GetAsync(
    Expression<Func<Review, bool>> predicate,
    Func<IQueryable<Review>, IQueryable<Review>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<ReviewResponseDto>> GetByIdAsync(
    Guid id,
    Func<IQueryable<Review>, IQueryable<Review>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<CreatedReviewResponseDto>> AddAsync(
    CreateReviewRequest request,
    Guid userId,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<NoData>> RemoveAsync(
    Guid id,
    Guid userId,
    string userRole,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<NoData>> UpdateAsync(
    UpdateReviewRequest request,
    Guid userId,
    CancellationToken cancellationToken = default);
}