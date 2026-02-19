using SepetYorumla.Core.Entities;

namespace SepetYorumla.Models.Entities;

public class User : Entity<Guid>
{
  public required string Username { get; set; }
  public required string Email { get; set; }
  public required string PasswordHash { get; set; }
  public required string PasswordKey { get; set; }
  public string? ProfileImageUrl { get; set; }
  public string? Bio {  get; set; }
  public bool IsActive { get; set; } = true;

  // Navigation properties
  public virtual ICollection<Basket> Baskets { get; set; } = new List<Basket>();
  public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();
  public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();
}
