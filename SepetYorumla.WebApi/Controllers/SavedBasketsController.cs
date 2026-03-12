using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SepetYorumla.Models.Dtos.SavedBaskets.Requests;
using SepetYorumla.Service.Abstracts;
using SepetYorumla.WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class SavedBasketsController(ISavedBasketService _savedBasketService) : CustomBaseController
{
  [HttpPost("toggle")]
  public async Task<IActionResult> Toggle([FromBody] CreateSavedBasketRequest request, CancellationToken cancellationToken)
  {
    var currentUserId = GetUserId();

    var result = await _savedBasketService.ToggleSaveAsync(request, currentUserId, cancellationToken);

    return CreateActionResult(result);
  }

  [HttpGet("my-saved")]
  public async Task<IActionResult> GetMySavedBaskets(CancellationToken cancellationToken)
  {
    var currentUserId = GetUserId();

    var result = await _savedBasketService.GetSavedBasketsAsync(currentUserId, cancellationToken);

    return CreateActionResult(result);
  }
}