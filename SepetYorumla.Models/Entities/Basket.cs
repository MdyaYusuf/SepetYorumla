using SepetYorumla.Core.Entities;

namespace SepetYorumla.Models.Entities;

public class Basket : Entity<Guid>
{
  public required string Title { get; set; }
  public string? Description { get; set; }
  public bool IsActive { get; set; } = true;

  // Navigation properties
  public virtual ICollection<Product> Products { get; set; } = new List<Product>();
  public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();
}
