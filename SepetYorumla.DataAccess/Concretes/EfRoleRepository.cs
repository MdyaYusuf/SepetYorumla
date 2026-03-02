using SepetYorumla.Core.Repositories;
using SepetYorumla.DataAccess.Abstracts;
using SepetYorumla.DataAccess.Contexts;
using SepetYorumla.Models.Entities;

namespace SepetYorumla.DataAccess.Concretes;

public class EfRoleRepository : EfBaseRepository<BaseDbContext, Role, int>, IRoleRepository
{
  public EfRoleRepository(BaseDbContext context) : base(context)
  {

  }
}
