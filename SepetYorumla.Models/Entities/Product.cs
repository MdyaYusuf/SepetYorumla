using SepetYorumla.Core.Entities;
using System.Diagnostics.CodeAnalysis;

namespace SepetYorumla.Models.Entities;

public class Product : Entity<Guid>
{
  [SetsRequiredMembers]
  public Product()
  {
    Name = default!;
  }

  public required string Name { get; set; }
  public decimal Price { get; set; }
  public string? StoreName { get; set; }
  public string? ImageUrl { get; set; }
  public string? Brand { get; set; }
  public string? Model { get; set; }
  public bool IsActive { get; set; } = true;

  // Navigation properties
  public Guid BasketId { get; set; }
  public virtual Basket Basket { get; set; } = default!;
  public int CategoryId { get; set; }
  public virtual Category Category { get; set; } = default!;
}
