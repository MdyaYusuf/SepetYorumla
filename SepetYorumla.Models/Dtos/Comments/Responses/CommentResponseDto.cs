namespace SepetYorumla.Models.Dtos.Comments.Responses;

public sealed record CommentResponseDto(
  int Id,
  string Text,
  Guid UserId,
  string Username,
  string? UserProfileImageUrl,
  Guid BasketId,
  string BasketTitle,
  DateTime CreatedDate);
