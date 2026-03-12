using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SepetYorumla.Models.Dtos.Users.Requests;
using SepetYorumla.Service.Abstracts;

namespace SepetYorumla.WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UsersController(IUserService _userService) : CustomBaseController
{
  [HttpGet]
  [Authorize(Roles = "Admin")]
  public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
  {
    var result = await _userService.GetAllAsync(cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [HttpGet("{id:guid}")]
  [Authorize]
  public async Task<IActionResult> GetById(Guid id, CancellationToken cancellationToken)
  {
    var result = await _userService.GetByIdAsync(id, cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [HttpPut]
  [Authorize]
  public async Task<IActionResult> Update([FromForm] UpdateUserRequest request, CancellationToken cancellationToken)
  {
    var userId = GetUserId();
    var userRole = GetUserRole();

    var result = await _userService.UpdateAsync(request, userId, userRole, cancellationToken);

    return CreateActionResult(result);
  }

  [HttpDelete("{id:guid}")]
  [Authorize]
  public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
  {
    var userId = GetUserId();
    var userRole = GetUserRole();

    var result = await _userService.RemoveAsync(id, userId, userRole, cancellationToken);

    return CreateActionResult(result);
  }

  [HttpPost("change-password")]
  [Authorize]
  public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest request, CancellationToken cancellationToken)
  {
    var userId = GetUserId();

    var result = await _userService.ChangePasswordAsync(request, userId, cancellationToken);

    return CreateActionResult(result);
  }

  [HttpGet("{id:guid}/stats")]
  [Authorize]
  public async Task<IActionResult> GetProfileStats(Guid id, CancellationToken cancellationToken)
  {
    var result = await _userService.GetProfileStatsAsync(id, cancellationToken);

    return CreateActionResult(result);
  }
}
