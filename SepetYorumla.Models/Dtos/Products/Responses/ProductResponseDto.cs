namespace SepetYorumla.Models.Dtos.Products.Responses;

public sealed record ProductResponseDto(
  string Name,
  string? Description,
  decimal Price,
  string? StoreName,
  string? ImageUrl,
  string? Brand,
  string? Model,
  Guid BasketId,
  string BasketTitle,
  int CategoryId,
  string CategoryName);