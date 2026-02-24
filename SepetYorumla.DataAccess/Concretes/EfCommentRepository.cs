using SepetYorumla.Core.Repositories;
using SepetYorumla.DataAccess.Abstracts;
using SepetYorumla.DataAccess.Contexts;
using SepetYorumla.Models.Entities;

namespace SepetYorumla.DataAccess.Concretes;

public class EfCommentRepository : EfBaseRepository<BaseDbContext, Comment, int>, ICommentRepository
{
  public EfCommentRepository(BaseDbContext context) : base(context)
  {

  }
}
