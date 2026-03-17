using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SepetYorumla.Service.Abstracts;

namespace SepetYorumla.WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class FollowsController(IFollowService _followService) : CustomBaseController
{
  [HttpPost("{id:guid}")]
  public async Task<IActionResult> ToggleFollow(Guid id, CancellationToken cancellationToken)
  {
    var result = await _followService.ToggleFollowAsync(GetUserId(), id, cancellationToken);

    return CreateActionResult(result);
  }

  [AllowAnonymous]
  [HttpGet("{userId:guid}/followers")]
  public async Task<IActionResult> GetFollowers(Guid userId, CancellationToken cancellationToken)
  {
    var result = await _followService.GetFollowersAsync(userId, cancellationToken);

    return CreateActionResult(result);
  }

  [AllowAnonymous]
  [HttpGet("{userId:guid}/following")]
  public async Task<IActionResult> GetFollowing(Guid userId, CancellationToken cancellationToken)
  {
    var result = await _followService.GetFollowingAsync(userId, cancellationToken);

    return CreateActionResult(result);
  }
}
