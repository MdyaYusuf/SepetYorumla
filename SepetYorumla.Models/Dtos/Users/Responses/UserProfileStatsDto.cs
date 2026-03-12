namespace SepetYorumla.Models.Dtos.Users.Responses;

public sealed record UserProfileStatsDto(
  int TotalBaskets,
  int TotalLikesReceived,
  int TotalSavedBaskets,
  int TotalCommentsMade,
  DateTime CreatedDate);