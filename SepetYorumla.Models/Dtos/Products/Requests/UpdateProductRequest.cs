namespace SepetYorumla.Models.Dtos.Products.Requests;

public sealed record UpdateProductRequest(
  Guid Id,
  string Name,
  decimal Price,
  string? StoreName,
  string? Brand,
  string? Model);
