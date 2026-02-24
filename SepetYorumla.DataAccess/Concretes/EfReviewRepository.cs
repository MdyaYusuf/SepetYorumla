using SepetYorumla.Core.Repositories;
using SepetYorumla.DataAccess.Abstracts;
using SepetYorumla.DataAccess.Contexts;
using SepetYorumla.Models.Entities;

namespace SepetYorumla.DataAccess.Concretes;

public class EfReviewRepository : EfBaseRepository<BaseDbContext, Review, Guid>, IReviewRepository
{
  public EfReviewRepository(BaseDbContext context) : base(context)
  {

  }
}
