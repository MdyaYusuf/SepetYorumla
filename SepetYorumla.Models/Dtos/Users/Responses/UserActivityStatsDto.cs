namespace SepetYorumla.Models.Dtos.Users.Responses;

public sealed record UserActivityStatsDto(
  int TotalBaskets,
  int TotalBasketsLiked,
  int TotalSavedBaskets,
  int TotalCommentsMade,
  DateTime CreatedDate);