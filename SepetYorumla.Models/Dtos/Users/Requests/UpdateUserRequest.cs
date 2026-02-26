namespace SepetYorumla.Models.Dtos.Users.Requests;

public sealed record UpdateUserRequest(
  Guid Id,
  string Username,
  string Email,
  string? ProfileImageUrl,
  string? Bio);
