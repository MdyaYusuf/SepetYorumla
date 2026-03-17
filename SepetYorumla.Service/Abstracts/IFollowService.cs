using SepetYorumla.Core.Responses;
using SepetYorumla.Models.Dtos.Users.Responses;

namespace SepetYorumla.Service.Abstracts;

public interface IFollowService
{
  Task<ReturnModel<NoData>> ToggleFollowAsync(Guid followerId, Guid followingId, CancellationToken cancellationToken = default);
  Task<ReturnModel<List<UserListItemResponseDto>>> GetFollowersAsync(Guid userId, CancellationToken cancellationToken = default);
  Task<ReturnModel<List<UserListItemResponseDto>>> GetFollowingAsync(Guid userId, CancellationToken cancellationToken = default);
}
