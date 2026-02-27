using Microsoft.AspNetCore.Mvc;
using SepetYorumla.Models.Dtos.Comments.Requests;
using SepetYorumla.Service.Abstracts;

namespace SepetYorumla.WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CommentsController(ICommentService _commentService) : CustomBaseController
{
  [HttpGet]
  public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
  {
    var result = await _commentService.GetAllAsync(cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [HttpGet("{id:int}")]
  public async Task<IActionResult> GetById(int id, CancellationToken cancellationToken)
  {
    var result = await _commentService.GetByIdAsync(id, cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [HttpPost]
  public async Task<IActionResult> Add(CreateCommentRequest request, CancellationToken cancellationToken)
  {
    var result = await _commentService.AddAsync(request, cancellationToken);

    return CreateActionResult(result);
  }

  [HttpPut]
  public async Task<IActionResult> Update(UpdateCommentRequest request, CancellationToken cancellationToken)
  {
    var result = await _commentService.UpdateAsync(request, cancellationToken);

    return CreateActionResult(result);
  }

  [HttpDelete("{id:int}")]
  public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
  {
    var result = await _commentService.RemoveAsync(id, cancellationToken);

    return CreateActionResult(result);
  }

  [HttpGet("basket/{basketId:guid}")]
  public async Task<IActionResult> GetByBasketId(Guid basketId, CancellationToken cancellationToken)
  {
    var result = await _commentService.GetAllAsync(
      filter: c => c.BasketId == basketId,
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }
}
