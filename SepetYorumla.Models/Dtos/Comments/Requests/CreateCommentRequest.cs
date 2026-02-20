namespace SepetYorumla.Models.Dtos.Comments.Requests;

public sealed record CreateCommentRequest(string Text, Guid UserId, Guid BasketId);
