using SepetYorumla.Core.Entities;
using System.Diagnostics.CodeAnalysis;

namespace SepetYorumla.Models.Entities;

public class Role : Entity<int>
{
  [SetsRequiredMembers]
  public Role()
  {
    Users = new HashSet<User>();

    Name = default!;
  }

  public required string Name { get; set; }

  // Navigation Properties
  public virtual ICollection<User> Users { get; set; }
}
