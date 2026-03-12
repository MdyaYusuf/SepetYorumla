using SepetYorumla.Models.Dtos.Baskets.Responses;
using SepetYorumla.Models.Entities;

namespace SepetYorumla.Service.Helpers;

public static class BasketMappingHelper
{
  public static void PopulateSummaryFields(Basket entity, BasketResponseDto dto)
  {
    var ratedReviews = entity.Reviews?.Where(r => r.StarRating.HasValue).ToList();

    dto.TotalRatingsCount = ratedReviews?.Count ?? 0;

    dto.AverageRating = dto.TotalRatingsCount > 0
      ? ratedReviews!.Average(r => r.StarRating!.Value)
      : 0;

    dto.TotalThumbsUp = entity.Reviews?.Count(r => r.IsThumbsUp == true) ?? 0;
    dto.TotalThumbsDown = entity.Reviews?.Count(r => r.IsThumbsUp == false) ?? 0;

    dto.TotalComments = entity.Comments?.Count ?? 0;
  }

  public static void PopulateUserInteraction(Basket basket, BasketResponseDto response, Guid? userId)
  {
    if (!userId.HasValue)
    {
      return;
    }

    if (basket.Reviews != null)
    {
      var userReview = basket.Reviews.FirstOrDefault(r => r.UserId == userId.Value);
      response.UserThumbsUp = userReview?.IsThumbsUp;
      response.UserStarRating = userReview?.StarRating;
    }

    if (basket.SavedBaskets != null)
    {
      response.IsSaved = basket.SavedBaskets.Any(sb => sb.UserId == userId.Value);
    }
  }
}