using SepetYorumla.Core.Responses;
using SepetYorumla.DataAccess.Abstracts;
using SepetYorumla.Models.Entities;
using SepetYorumla.Service.Abstracts;
using SepetYorumla.Service.BusinessRules;

namespace SepetYorumla.Service.Concretes;

public class FollowService(
  IFollowRepository _followRepository,
  FollowBusinessRules _followRules,
  IUnitOfWork _unitOfWork) : IFollowService
{
  public async Task<ReturnModel<NoData>> ToggleFollowAsync(Guid followerId, Guid followingId, CancellationToken cancellationToken = default)
  {
    _followRules.CannotFollowSelf(followerId, followingId);
    await _followRules.FollowingUserMustExist(followingId, cancellationToken);

    var existingFollow = await _followRepository.GetAsync(
      predicate: f => f.FollowerId == followerId && f.FollowingId == followingId,
      enableTracking: true,
      cancellationToken: cancellationToken);

    string message;

    if (existingFollow != null)
    {
      _followRepository.Delete(existingFollow);
      message = "Takip bırakıldı.";
    }
    else
    {
      await _followRepository.AddAsync(new Follow() { FollowerId = followerId, FollowingId = followingId }, cancellationToken);
      message = "Başarıyla takip edildi.";
    }

    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<NoData>()
    {
      Success = true,
      Message = message,
      Data = null,
      StatusCode = 200
    };
  }
}
