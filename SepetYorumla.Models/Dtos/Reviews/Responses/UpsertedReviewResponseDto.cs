namespace SepetYorumla.Models.Dtos.Reviews.Responses;

public sealed record UpsertedReviewResponseDto(
  Guid Id,
  decimal? StarRating,
  bool? IsThumbsUp);
