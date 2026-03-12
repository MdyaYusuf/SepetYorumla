using SepetYorumla.Core.Repositories;
using SepetYorumla.DataAccess.Abstracts;
using SepetYorumla.DataAccess.Contexts;
using SepetYorumla.Models.Entities;

namespace SepetYorumla.DataAccess.Concretes;

public class EfProductRepository : EfBaseRepository<BaseDbContext, Product, Guid>, IProductRepository
{
  public EfProductRepository(BaseDbContext context) : base(context)
  {
    
  }
}
