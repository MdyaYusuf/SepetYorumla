namespace SepetYorumla.Models.Dtos.Users.Responses;

public sealed record UserResponseDto(Guid Id, string Username, string? ProfileImageUrl, string? Bio);
