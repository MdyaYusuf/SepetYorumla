using SepetYorumla.Core.Repositories;
using SepetYorumla.Models.Entities;

namespace SepetYorumla.DataAccess.Abstracts;

public interface IProductRepository : IRepository<Product, Guid>
{
  Task<Product?> GetByNameAsync(string name);
}
