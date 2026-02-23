using SepetYorumla.Core.Entities;
using System.Diagnostics.CodeAnalysis;

namespace SepetYorumla.Models.Entities;

public class Basket : Entity<Guid>
{
  [SetsRequiredMembers]
  public Basket()
  {
    Products = new HashSet<Product>();
    Reviews = new HashSet<Review>();
    Comments = new HashSet<Comment>();

    Title = default!;
  }

  public required string Title { get; set; }
  public string? Description { get; set; }
  public bool IsActive { get; set; } = true;

  // Navigation properties
  public Guid UserId { get; set; }
  public virtual User User { get; set; } = default!;
  public virtual ICollection<Product> Products { get; set; }
  public virtual ICollection<Review> Reviews { get; set; }
  public virtual ICollection<Comment> Comments { get; set; }
}
