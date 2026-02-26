using SepetYorumla.Core.Responses;
using SepetYorumla.Models.Dtos.Users.Requests;
using SepetYorumla.Models.Dtos.Users.Responses;
using SepetYorumla.Models.Entities;
using System.Linq.Expressions;

namespace SepetYorumla.Service.Abstracts;

public interface IUserService
{
  Task<ReturnModel<List<UserResponseDto>>> GetAllAsync(
    Expression<Func<User, bool>>? filter = null,
    Func<IQueryable<User>, IQueryable<User>>? include = null,
    Func<IQueryable<User>, IOrderedQueryable<User>>? orderBy = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<UserResponseDto>> GetAsync(
    Expression<Func<User, bool>> predicate,
    Func<IQueryable<User>, IQueryable<User>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<UserResponseDto>> GetByIdAsync(
    Guid id,
    Func<IQueryable<User>, IQueryable<User>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<UserResponseDto>> RegisterAsync(
    RegisterUserRequest request,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<NoData>> RemoveAsync(
    Guid id,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<NoData>> UpdateAsync(
    UpdateUserRequest request,
    CancellationToken cancellationToken = default);
}