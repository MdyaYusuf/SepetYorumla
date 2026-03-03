using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SepetYorumla.Models.Dtos.Users.Requests;
using SepetYorumla.Service.Abstracts;

namespace SepetYorumla.WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthenticationController(IAuthenticationService _authenticationService) : CustomBaseController
{
  [HttpPost("register")]
  public async Task<IActionResult> Register(RegisterUserRequest request, CancellationToken cancellationToken)
  {
    var result = await _authenticationService.RegisterAsync(request, cancellationToken);

    return CreateActionResult(result);
  }

  [HttpPost("login")]
  public async Task<IActionResult> Login(LoginRequest request, CancellationToken cancellationToken)
  {
    var result = await _authenticationService.LoginAsync(request, cancellationToken);

    return CreateActionResult(result);
  }

  [HttpPost("refresh-token")]
  public async Task<IActionResult> RefreshToken(CancellationToken cancellationToken)
  {
    var result = await _authenticationService.RefreshTokenAsync(cancellationToken);

    return CreateActionResult(result);
  }

  [HttpPost("logout")]
  [Authorize]
  public async Task<IActionResult> Logout(CancellationToken cancellationToken)
  {
    var result = await _authenticationService.RevokeRefreshTokenAsync(cancellationToken);

    return CreateActionResult(result);
  }
}
