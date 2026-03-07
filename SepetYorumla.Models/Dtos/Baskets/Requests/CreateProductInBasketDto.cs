using Microsoft.AspNetCore.Http;

namespace SepetYorumla.Models.Dtos.Baskets.Requests;

public sealed record CreateProductInBasketDto(
  string Name,
  string? Description,
  decimal Price,
  string? StoreName,
  string? ImageUrl,
  string? Brand,
  string? Model,
  int CategoryId,
  IFormFile? ImageFile);
