using SepetYorumla.Core.Entities;
using System.Diagnostics.CodeAnalysis;

namespace SepetYorumla.Models.Entities;

public class Follow : Entity<Guid>
{
  [SetsRequiredMembers]
  public Follow()
  {

  }

  public required Guid FollowerId { get; set; }
  public virtual User Follower { get; set; } = default!;
  public required Guid FollowingId { get; set; }
  public virtual User Following { get; set; } = default!;
}
