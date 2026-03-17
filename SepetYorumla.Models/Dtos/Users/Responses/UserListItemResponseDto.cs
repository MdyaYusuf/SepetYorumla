namespace SepetYorumla.Models.Dtos.Users.Responses;

public sealed record UserListItemResponseDto(
  Guid Id,
  string Username,
  string? ProfileImageUrl);
