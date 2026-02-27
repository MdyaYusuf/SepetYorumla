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
    var result = await _basketService.GetAllAsync(cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [HttpGet("{id:guid}")]
  public async Task<IActionResult> GetById(Guid id, CancellationToken cancellationToken)
  {
    var result = await _basketService.GetByIdAsync(id, cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [HttpPost]
  public async Task<IActionResult> Add(CreateBasketRequest request, CancellationToken cancellationToken)
  {
    var result = await _basketService.AddAsync(request, cancellationToken);

    return CreateActionResult(result);
  }

  [HttpPut]
  public async Task<IActionResult> Update(UpdateBasketRequest request, CancellationToken cancellationToken)
  {
    var result = await _basketService.UpdateAsync(request, cancellationToken);

    return CreateActionResult(result);
  }

  [HttpDelete("{id:guid}")]
  public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
  {
    var result = await _basketService.RemoveAsync(id, cancellationToken);

    return CreateActionResult(result);
  }

  [HttpGet("user/{userId:guid}")]
  public async Task<IActionResult> GetByUserId(Guid userId, CancellationToken cancellationToken)
  {
    var result = await _basketService.GetAllAsync(
      filter: x => x.UserId == userId,
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }
}
