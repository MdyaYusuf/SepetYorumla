using SepetYorumla.Core.Entities;
using System.Diagnostics.CodeAnalysis;

namespace SepetYorumla.Models.Entities;

public class SavedBasket : Entity<Guid>
{
  [SetsRequiredMembers]
  public SavedBasket()
  {

  }

  public required Guid UserId { get; set; }
  public virtual User User { get; set; } = default!;
  public required Guid BasketId { get; set; }
  public virtual Basket Basket { get; set; } = default!;
}
