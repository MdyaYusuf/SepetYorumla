using Microsoft.AspNetCore.Mvc;
using SepetYorumla.Core.Responses;

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
}
