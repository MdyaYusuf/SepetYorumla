using SepetYorumla.Core.Responses;
using SepetYorumla.Models.Dtos.Comments.Requests;
using SepetYorumla.Models.Dtos.Comments.Responses;
using SepetYorumla.Models.Entities;
using System.Linq.Expressions;

namespace SepetYorumla.Service.Abstracts;

public interface ICommentService
{
  Task<ReturnModel<List<CommentResponseDto>>> GetAllAsync(
    Expression<Func<Comment, bool>>? filter = null,
    Func<IQueryable<Comment>, IQueryable<Comment>>? include = null,
    Func<IQueryable<Comment>, IOrderedQueryable<Comment>>? orderBy = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<CommentResponseDto>> GetAsync(
    Expression<Func<Comment, bool>> predicate,
    Func<IQueryable<Comment>, IQueryable<Comment>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<CommentResponseDto>> GetByIdAsync(
    int id,
    Func<IQueryable<Comment>, IQueryable<Comment>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<CommentResponseDto>> AddAsync(
    CreateCommentRequest request,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<NoData>> RemoveAsync(
    int id,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<NoData>> UpdateAsync(
    UpdateCommentRequest request,
    CancellationToken cancellationToken = default);
}