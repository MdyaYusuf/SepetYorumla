using SepetYorumla.Core.Repositories;
using SepetYorumla.Models.Entities;

namespace SepetYorumla.DataAccess.Abstracts;

public interface ICategoryRepository : IRepository<Category, int>
{
  Task<Category?> GetByNameAsync(string name);
}
