namespace SepetYorumla.Models.Dtos.Baskets.Responses;

public class BasketResponseDto
{
  public Guid Id { get; set; }
  public string Title { get; set; } = null!;
  public string? Description { get; set; }
  public Guid UserId { get; set; }
  public string Username { get; set; } = null!;
  public string? UserProfileImageUrl { get; set; }
  public List<ProductPreviewDto> Products { get; set; } = new();
  public DateTime CreatedDate { get; set; }

  // UI fields
  public decimal AverageRating { get; set; }
  public int TotalThumbsUp { get; set; }
  public int TotalThumbsDown { get; set; }
  public int TotalComments { get; set; }
  public int TotalRatingsCount { get; set; }
  public bool? UserThumbsUp { get; set; }
  public decimal? UserStarRating { get; set; }
}
