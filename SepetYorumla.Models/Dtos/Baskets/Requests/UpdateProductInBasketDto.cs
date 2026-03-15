using Microsoft.AspNetCore.Http;

namespace SepetYorumla.Models.Dtos.Baskets.Requests;

public class UpdateProductInBasketDto
{
  public Guid? Id { get; set; }
  public string Name { get; set; } = default!;
  public decimal Price { get; set; }
  public int CategoryId { get; set; }
  public string? StoreName { get; set; }
  public string? Brand { get; set; }
  public string? Model { get; set; }
  public string? Description { get; set; }
  public IFormFile? ImageFile { get; set; }
}
