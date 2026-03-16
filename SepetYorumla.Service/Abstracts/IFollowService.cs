using SepetYorumla.Core.Responses;

namespace SepetYorumla.Service.Abstracts;

public interface IFollowService
{
  Task<ReturnModel<NoData>> ToggleFollowAsync(Guid followerId, Guid followingId, CancellationToken cancellationToken = default);
}
