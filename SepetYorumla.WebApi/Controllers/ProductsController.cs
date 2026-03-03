using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SepetYorumla.Models.Dtos.Products.Requests;
using SepetYorumla.Service.Abstracts;

namespace SepetYorumla.WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProductsController(IProductService _productService) : CustomBaseController
{
  [HttpGet]
  public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
  {
    var result = await _productService.GetAllAsync(cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [HttpGet("{id:guid}")]
  public async Task<IActionResult> GetById(Guid id, CancellationToken cancellationToken)
  {
    var result = await _productService.GetByIdAsync(id, cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [HttpGet("getbyname")]
  public async Task<IActionResult> GetByName([FromQuery] string name, CancellationToken cancellationToken)
  {
    var result = await _productService.GetAsync(
      predicate: p => p.Name == name,
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [HttpPost]
  [Authorize]
  public async Task<IActionResult> Add(CreateProductRequest request, CancellationToken cancellationToken)
  {
    var userId = GetUserId();

    var result = await _productService.AddAsync(request, userId, cancellationToken);

    return CreateActionResult(result);
  }

  [HttpPut]
  [Authorize]
  public async Task<IActionResult> Update(UpdateProductRequest request, CancellationToken cancellationToken)
  {
    var userId = GetUserId();

    var result = await _productService.UpdateAsync(request, userId, cancellationToken);

    return CreateActionResult(result);
  }

  [HttpDelete("{id:guid}")]
  [Authorize]
  public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
  {
    var userId = GetUserId();
    var userRole = GetUserRole();

    var result = await _productService.RemoveAsync(id, userId, userRole, cancellationToken);

    return CreateActionResult(result);
  }
}