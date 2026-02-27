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

  [HttpPost]
  public async Task<IActionResult> Add(CreateReviewRequest request, CancellationToken cancellationToken)
  {
    var result = await _reviewService.AddAsync(request, cancellationToken);

    return CreateActionResult(result);
  }

  [HttpPut]
  public async Task<IActionResult> Update(UpdateReviewRequest request, CancellationToken cancellationToken)
  {
    var result = await _reviewService.UpdateAsync(request, cancellationToken);

    return CreateActionResult(result);
  }

  [HttpDelete("{id:guid}")]
  public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
  {
    var result = await _reviewService.RemoveAsync(id, cancellationToken);

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
