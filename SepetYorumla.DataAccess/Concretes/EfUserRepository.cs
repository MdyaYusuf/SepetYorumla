using Microsoft.EntityFrameworkCore;
using SepetYorumla.Core.Repositories;
using SepetYorumla.DataAccess.Abstracts;
using SepetYorumla.DataAccess.Contexts;
using SepetYorumla.Models.Entities;

namespace SepetYorumla.DataAccess.Concretes;

public class EfUserRepository : EfBaseRepository<BaseDbContext, User, Guid>, IUserRepository
{
  public EfUserRepository(BaseDbContext context) : base(context)
  {

  }

  public async Task<User?> GetUserByEmailAsync(string email)
  {
    return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
  }

  public async Task<bool> IsEmailUniqueAsync(string email)
  {
    return !await _context.Users.AnyAsync(u => u.Email == email);
  }
}
