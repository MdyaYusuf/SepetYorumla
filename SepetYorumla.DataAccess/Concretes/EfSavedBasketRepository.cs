using SepetYorumla.Core.Repositories;
using SepetYorumla.DataAccess.Abstracts;
using SepetYorumla.DataAccess.Contexts;
using SepetYorumla.Models.Entities;

namespace SepetYorumla.DataAccess.Concretes;

public class EfSavedBasketRepository : EfBaseRepository<BaseDbContext, SavedBasket, Guid>, ISavedBasketRepository
{
  public EfSavedBasketRepository(BaseDbContext context) : base(context)
  {

  }
}
