using SepetYorumla.Core.Entities;
using System.Diagnostics.CodeAnalysis;

namespace SepetYorumla.Models.Entities;

public class Category : Entity<int>
{
  [SetsRequiredMembers]
  public Category()
  {
    Products = new HashSet<Product>();

    Name = default!;
  }

  public required string Name { get; set; }

  // Navigation properties
  public virtual ICollection<Product> Products { get; set; }
}
