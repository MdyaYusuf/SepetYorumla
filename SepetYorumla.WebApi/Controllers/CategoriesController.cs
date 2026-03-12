using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SepetYorumla.Models.Dtos.Categories.Requests;
using SepetYorumla.Service.Abstracts;

namespace SepetYorumla.WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CategoriesController(ICategoryService _categoryService) : CustomBaseController
{
  [HttpGet]
  public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
  {
    var result = await _categoryService.GetAllAsync(cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [HttpGet("{id:int}")]
  public async Task<IActionResult> GetById([FromRoute] int id, CancellationToken cancellationToken)
  {
    var result = await _categoryService.GetByIdAsync(id, cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [HttpGet("getbyname")]
  public async Task<IActionResult> GetByName([FromQuery] string name, CancellationToken cancellationToken)
  {
    var result = await _categoryService.GetAsync(
      predicate: c => c.Name.ToLower() == name.ToLower(),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [HttpPost]
  [Authorize(Roles = "Admin")]
  public async Task<IActionResult> Add([FromBody] CreateCategoryRequest request, CancellationToken cancellationToken)
  {
    var result = await _categoryService.AddAsync(request, cancellationToken);

    return CreateActionResult(result);
  }

  [HttpDelete("{id:int}")]
  [Authorize(Roles = "Admin")]
  public async Task<IActionResult> Delete([FromRoute] int id, CancellationToken cancellationToken)
  {
    var result = await _categoryService.RemoveAsync(id, cancellationToken);

    return CreateActionResult(result);
  }

  [HttpPut]
  [Authorize(Roles = "Admin")]
  public async Task<IActionResult> Update([FromBody] UpdateCategoryRequest request, CancellationToken cancellationToken)
  {
    var result = await _categoryService.UpdateAsync(request, cancellationToken);

    return CreateActionResult(result);
  }
}
