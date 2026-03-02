using Microsoft.AspNetCore.Mvc;
using SepetYorumla.Models.Dtos.Roles.Requests;
using SepetYorumla.Service.Abstracts;

namespace SepetYorumla.WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class RolesController(IRoleService _roleService) : CustomBaseController
{
  [HttpGet]
  public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
  {
    var result = await _roleService.GetAllAsync(cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [HttpGet("{id:int}")]
  public async Task<IActionResult> GetById([FromRoute] int id, CancellationToken cancellationToken)
  {
    var result = await _roleService.GetByIdAsync(id, cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [HttpGet("getbyname")]
  public async Task<IActionResult> GetByName([FromQuery] string name, CancellationToken cancellationToken)
  {
    var result = await _roleService.GetAsync(
      predicate: r => r.Name.Equals(name, StringComparison.OrdinalIgnoreCase),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [HttpPost]
  public async Task<IActionResult> Add([FromBody] CreateRoleRequest request, CancellationToken cancellationToken)
  {
    var result = await _roleService.AddAsync(request, cancellationToken);

    return CreateActionResult(result);
  }

  [HttpDelete("{id:int}")]
  public async Task<IActionResult> Delete([FromRoute] int id, CancellationToken cancellationToken)
  {
    var result = await _roleService.RemoveAsync(id, cancellationToken);

    return CreateActionResult(result);
  }

  [HttpPut]
  public async Task<IActionResult> Update([FromBody] UpdateRoleRequest request, CancellationToken cancellationToken)
  {
    var result = await _roleService.UpdateAsync(request, cancellationToken);

    return CreateActionResult(result);
  }
}
