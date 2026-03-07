namespace SepetYorumla.Models.Dtos.Baskets.Responses;

public sealed record ProductPreviewDto(
  string Name,
  string? ImageUrl,
  decimal Price,
  string CategoryName);
