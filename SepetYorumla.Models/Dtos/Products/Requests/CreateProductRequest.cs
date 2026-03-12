using Microsoft.AspNetCore.Http;

namespace SepetYorumla.Models.Dtos.Products.Requests;

public sealed record CreateProductRequest(
  string Name,
  string? Description,
  decimal Price,
  string? StoreName,
  IFormFile? ImageFile,
  string? Brand,
  string? Model,
  Guid BasketId,
  int CategoryId);
