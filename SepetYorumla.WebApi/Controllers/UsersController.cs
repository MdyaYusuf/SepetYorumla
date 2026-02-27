using Microsoft.AspNetCore.Mvc;
using SepetYorumla.Models.Dtos.Users.Requests;
using SepetYorumla.Service.Abstracts;

namespace SepetYorumla.WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UsersController(IUserService _userService) : CustomBaseController
{
  [HttpGet]
  public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
  {
    var result = await _userService.GetAllAsync(cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [HttpGet("{id:guid}")]
  public async Task<IActionResult> GetById(Guid id, CancellationToken cancellationToken)
  {
    var result = await _userService.GetByIdAsync(id, cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [HttpPost("register")]
  public async Task<IActionResult> Register(RegisterUserRequest request, CancellationToken cancellationToken)
  {
    var result = await _userService.RegisterAsync(request, cancellationToken);

    return CreateActionResult(result);
  }

  [HttpPut]
  public async Task<IActionResult> Update(UpdateUserRequest request, CancellationToken cancellationToken)
  {
    var result = await _userService.UpdateAsync(request, cancellationToken);

    return CreateActionResult(result);
  }

  [HttpDelete("{id:guid}")]
  public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
  {
    var result = await _userService.RemoveAsync(id, cancellationToken);

    return CreateActionResult(result);
  }
}
