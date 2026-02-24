using SepetYorumla.Core.Repositories;
using SepetYorumla.Models.Entities;

namespace SepetYorumla.DataAccess.Abstracts;

public interface IUserRepository : IRepository<User, Guid>
{
  Task<User?> GetUserByEmailAsync(string email);
  Task<bool> IsEmailUniqueAsync(string email);
}
