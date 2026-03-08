using SepetYorumla.Core.Entities;

namespace SepetYorumla.Models.Entities;

public class Review : Entity<Guid>
{
  public decimal? StarRating { get; set; }
  public bool? IsThumbsUp { get; set; }
  public bool IsActive { get; set; } = true;

  // Navigation properties
  public Guid UserId { get; set; }
  public virtual User User { get; set; } = default!;
  public Guid BasketId { get; set; }
  public virtual Basket Basket { get; set; } = default!;
}
