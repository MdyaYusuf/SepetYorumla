namespace SepetYorumla.Models.Dtos.Products.Requests;

public sealed record CreateProductRequest(
  string Name,
  decimal Price,
  string? StoreName,
  string? ImageUrl,
  string? Brand,
  string? Model,
  Guid BasketId,
  int CategoryId);
