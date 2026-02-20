namespace SepetYorumla.Models.Dtos.Reviews.Requests;

public sealed record UpdateReviewRequest(Guid Id, decimal StarRating, bool IsThumbsUp);
