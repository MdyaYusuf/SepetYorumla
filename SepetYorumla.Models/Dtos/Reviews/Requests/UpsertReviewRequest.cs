namespace SepetYorumla.Models.Dtos.Reviews.Requests;

public sealed record UpsertReviewRequest(
  decimal? StarRating,
  bool? IsThumbsUp,
  Guid BasketId);
