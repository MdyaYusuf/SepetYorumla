using SepetYorumla.Core.Exceptions;
using SepetYorumla.DataAccess.Abstracts;

namespace SepetYorumla.Service.BusinessRules;

public class FollowBusinessRules(IUserRepository _userRepository)
{
  public void CannotFollowSelf(Guid followerId, Guid followingId)
  {
    if (followerId == followingId)
    {
      throw new BusinessException("Kendinizi takip edemezsiniz.");
    }
  }

  public async Task FollowingUserMustExist(Guid followingId, CancellationToken cancellationToken)
  {
    bool exists = await _userRepository.AnyAsync(u => u.Id == followingId, cancellationToken);

    if (!exists)
    {
      throw new NotFoundException("Takip edilmek istenen kullanıcı bulunamadı.");
    }
  }
}
