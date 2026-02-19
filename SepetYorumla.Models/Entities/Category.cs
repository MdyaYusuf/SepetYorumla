using SepetYorumla.Core.Entities;
using System.Diagnostics.CodeAnalysis;

namespace SepetYorumla.Models.Entities;

public class Category : Entity<int>
{
  [SetsRequiredMembers]
  public Category()
  {
    Name = default!;
  }

  public required string Name { get; set; }
  public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}
