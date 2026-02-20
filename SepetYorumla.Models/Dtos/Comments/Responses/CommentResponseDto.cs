namespace SepetYorumla.Models.Dtos.Comments.Responses;

public sealed record CommentResponseDto(int Id, string Text, Guid UserId, Guid BasketId, DateTime CreatedDate);
