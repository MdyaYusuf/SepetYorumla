using SepetYorumla.Core.Entities;

namespace SepetYorumla.Models.Entities;

public class Comment : Entity<int>
{
  public required string Text { get; set; }
  public bool IsActive { get; set; } = true;

  // Navigation properties
  public Guid UserId { get; set; }
  public virtual User User { get; set; } = default!;
  public Guid BasketId { get; set; }
  public virtual Basket Basket { get; set; } = default!;
}
