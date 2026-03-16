using SepetYorumla.Core.Entities;
using System.Diagnostics.CodeAnalysis;

namespace SepetYorumla.Models.Entities;

public class User : Entity<Guid>
{
  [SetsRequiredMembers]
  public User()
  {
    Baskets = new HashSet<Basket>();
    Reviews = new HashSet<Review>();
    Comments = new HashSet<Comment>();
    SavedBaskets = new HashSet<SavedBasket>();
    Followers = new HashSet<Follow>();
    Following = new HashSet<Follow>();

    Username = default!;
    Email = default!;
    PasswordHash = default!;
    PasswordKey = default!;
  }

  public required string Username { get; set; }
  public required string Email { get; set; }
  public required string PasswordHash { get; set; }
  public required string PasswordKey { get; set; }
  public string? RefreshToken { get; set; }
  public DateTime? RefreshTokenExpiration { get; set; }
  public string? ProfileImageUrl { get; set; }
  public string? Bio {  get; set; }
  public bool IsActive { get; set; } = true;

  // Navigation properties
  public int RoleId { get; set; }
  public virtual Role Role { get; set; } = default!;
  public virtual ICollection<Basket> Baskets { get; set; }
  public virtual ICollection<Review> Reviews { get; set; }
  public virtual ICollection<Comment> Comments { get; set; }
  public virtual ICollection<SavedBasket> SavedBaskets { get; set; }
  public virtual ICollection<Follow> Followers { get; set; }
  public virtual ICollection<Follow> Following { get; set; }
}
