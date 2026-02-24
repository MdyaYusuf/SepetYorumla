using SepetYorumla.Core.Repositories;
using SepetYorumla.DataAccess.Abstracts;
using SepetYorumla.DataAccess.Contexts;
using SepetYorumla.Models.Entities;

namespace SepetYorumla.DataAccess.Concretes;

public class EfBasketRepository : EfBaseRepository<BaseDbContext, Basket, Guid>, IBasketRepository
{
  public EfBasketRepository(BaseDbContext context) : base(context)
  {

  }
}
