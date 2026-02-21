namespace SepetYorumla.Models.Dtos.Products.Responses;

public sealed record ProductResponseDto(
  Guid Id,
  string Name,
  decimal Price,
  string? StoreName,
  string? ImageUrl,
  string? Brand,
  string? Model,
  int CategoryId,
  string CategoryName);