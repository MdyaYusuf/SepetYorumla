using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SepetYorumla.Models.Dtos.Reviews.Requests;
using SepetYorumla.Service.Abstracts;

namespace SepetYorumla.WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ReviewsController(IReviewService _reviewService) : CustomBaseController
{
  [HttpGet]
  public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
  {
    var result = await _reviewService.GetAllAsync(cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [HttpGet("{id:guid}")]
  public async Task<IActionResult> GetById(Guid id, CancellationToken cancellationToken)
  {
    var result = await _reviewService.GetByIdAsync(id, cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [HttpPost("upsert")]
  [Authorize]
  public async Task<IActionResult> Upsert(UpsertReviewRequest request, CancellationToken cancellationToken)
  {
    var userId = GetUserId();

    var result = await _reviewService.UpsertAsync(request, userId, cancellationToken);

    return CreateActionResult(result);
  }

  [HttpDelete("{id:guid}")]
  [Authorize]
  public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
  {
    var userId = GetUserId();
    var userRole = GetUserRole();

    var result = await _reviewService.RemoveAsync(id, userId, userRole, cancellationToken);

    return CreateActionResult(result);
  }

  [HttpGet("basket/{basketId:guid}")]
  public async Task<IActionResult> GetByBasketId(Guid basketId, CancellationToken cancellationToken)
  {
    var result = await _reviewService.GetAllAsync(
      filter: r => r.BasketId == basketId,
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }
}
