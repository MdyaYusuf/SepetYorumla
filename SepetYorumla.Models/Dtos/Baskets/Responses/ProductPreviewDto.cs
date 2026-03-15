namespace SepetYorumla.Models.Dtos.Baskets.Responses;

public sealed record ProductPreviewDto(
  Guid Id,
  int CategoryId,
  string Name,
  string? ImageUrl,
  decimal Price,
  string CategoryName,
  string? Brand,
  string? Model,
  string? StoreName,
  string? Description);
