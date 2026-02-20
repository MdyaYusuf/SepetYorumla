namespace SepetYorumla.Models.Dtos.Reviews.Requests;

public sealed record CreateReviewRequest(decimal StarRating, bool IsThumbsUp, Guid UserId, Guid BasketId);
