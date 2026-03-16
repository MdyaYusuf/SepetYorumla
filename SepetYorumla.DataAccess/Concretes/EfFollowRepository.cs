using SepetYorumla.Core.Repositories;
using SepetYorumla.DataAccess.Abstracts;
using SepetYorumla.DataAccess.Contexts;
using SepetYorumla.Models.Entities;

namespace SepetYorumla.DataAccess.Concretes;

public class EfFollowRepository : EfBaseRepository<BaseDbContext, Follow, Guid>, IFollowRepository
{
  public EfFollowRepository(BaseDbContext context) : base(context)
  {

  }
}
