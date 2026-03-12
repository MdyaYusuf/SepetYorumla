using Microsoft.AspNetCore.Http;

namespace SepetYorumla.Models.Dtos.Users.Requests;

public sealed record UpdateUserRequest(
  string Username,
  string Email,
  string? Bio,
  IFormFile? ImageFile);
