namespace SepetYorumla.Models.Dtos.Users.Requests;

public sealed record UpdateUserRequest(Guid Id, string? ProfileImageUrl, string? Bio);
