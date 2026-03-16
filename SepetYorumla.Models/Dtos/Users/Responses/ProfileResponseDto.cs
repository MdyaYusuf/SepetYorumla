using SepetYorumla.Models.Dtos.Baskets.Responses;

namespace SepetYorumla.Models.Dtos.Users.Responses;

public sealed record ProfileResponseDto(
  Guid Id,
  string Username,
  string? ProfileImageUrl,
  string? Bio,
  DateTime CreatedDate,
  int FollowersCount,
  int FollowingCount,
  int TotalCommentsReceived,
  int TotalLikesReceived,
  bool IsFollowing,
  List<BasketResponseDto> TopBaskets);
