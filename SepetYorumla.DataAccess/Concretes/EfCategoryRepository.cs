using Microsoft.EntityFrameworkCore;
using SepetYorumla.Core.Repositories;
using SepetYorumla.DataAccess.Abstracts;
using SepetYorumla.DataAccess.Contexts;
using SepetYorumla.Models.Entities;

namespace SepetYorumla.DataAccess.Concretes;

public class EfCategoryRepository : EfBaseRepository<BaseDbContext, Category, int>, ICategoryRepository
{
  public EfCategoryRepository(BaseDbContext context) : base(context)
  {
    
  }
}
