using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SepetYorumla.Models.Dtos.Baskets.Requests;
using SepetYorumla.Service.Abstracts;

namespace SepetYorumla.WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BasketsController(IBasketService _basketService) : CustomBaseController
{
  [HttpGet]
  public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
  {
    var result = await _basketService.GetAllAsync(
      userId: TryGetUserId(),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [HttpGet("{id:guid}")]
  public async Task<IActionResult> GetById(Guid id, CancellationToken cancellationToken)
  {
    var result = await _basketService.GetByIdAsync(
      id,
      userId: TryGetUserId(),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [HttpGet("top-rated/{count:int}")]
  public async Task<IActionResult> GetTopRated(int count, CancellationToken cancellationToken)
  {
    var result = await _basketService.GetTopRatedAsync(
      count: count,
      userId: TryGetUserId(),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [HttpPost]
  [Authorize]
  public async Task<IActionResult> Add([FromForm] CreateBasketRequest request, CancellationToken cancellationToken)
  {
    var userId = GetUserId();

    var result = await _basketService.AddAsync(request, userId, cancellationToken);

    return CreateActionResult(result);
  }

  [HttpPut]
  [Authorize]
  public async Task<IActionResult> Update([FromForm] UpdateBasketRequest request, CancellationToken cancellationToken)
  {
    var userId = GetUserId();

    var result = await _basketService.UpdateAsync(request, userId, cancellationToken);

    return CreateActionResult(result);
  }

  [HttpDelete("{id:guid}")]
  [Authorize]
  public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
  {
    var userId = GetUserId();
    var userRole = GetUserRole();

    var result = await _basketService.RemoveAsync(id, userId, userRole, cancellationToken);

    return CreateActionResult(result);
  }

  [HttpGet("my-baskets")]
  [Authorize]
  public async Task<IActionResult> GetMyBaskets(CancellationToken cancellationToken)
  {
    var currentUserId = GetUserId();

    var result = await _basketService.GetAllAsync(
      userId: currentUserId,
      filter: x => x.UserId == currentUserId,
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [HttpGet("my-liked-baskets")]
  [Authorize]
  public async Task<IActionResult> GetMyLikedBaskets(CancellationToken cancellationToken)
  {
    var currentUserId = GetUserId();

    var result = await _basketService.GetAllAsync(
      userId: currentUserId,
      filter: b => b.Reviews.Any(r => r.UserId == currentUserId && r.IsThumbsUp == true),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [HttpGet("my-commented-baskets")]
  [Authorize]
  public async Task<IActionResult> GetMyCommentedBaskets(CancellationToken cancellationToken)
  {
    var currentUserId = GetUserId();

    var result = await _basketService.GetAllAsync(
      userId: currentUserId,
      filter: b => b.Comments.Any(c => c.UserId == currentUserId),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }
}
