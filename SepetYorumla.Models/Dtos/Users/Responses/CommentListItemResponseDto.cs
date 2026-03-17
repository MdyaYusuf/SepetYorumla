namespace SepetYorumla.Models.Dtos.Users.Responses;

public sealed record CommentListItemResponseDto(
  Guid BasketId,
  string BasketTitle,
  string Text,
  DateTime CreatedDate);
