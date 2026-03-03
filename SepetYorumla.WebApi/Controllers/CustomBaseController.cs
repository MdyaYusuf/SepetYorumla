using Microsoft.AspNetCore.Mvc;
using SepetYorumla.Core.Exceptions;
using SepetYorumla.Core.Responses;
using System.Security.Claims;

namespace SepetYorumla.WebApi.Controllers;

public class CustomBaseController : ControllerBase
{
  [NonAction]
  public IActionResult CreateActionResult<T>(ReturnModel<T> result)
  {
    return new ObjectResult(result)
    {
      StatusCode = result.StatusCode
    };
  }

  [NonAction]
  protected Guid GetUserId()
  {
    var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

    if (string.IsNullOrEmpty(userId) || !Guid.TryParse(userId, out Guid guid))
    {
      throw new AuthorizationException("İşlem için giriş yapmanız gerekmektedir.");
    }

    return guid;
  }

  [NonAction]
  protected string GetUserRole()
  {
    return User.FindFirst(ClaimTypes.Role)?.Value ?? string.Empty;
  }
}
