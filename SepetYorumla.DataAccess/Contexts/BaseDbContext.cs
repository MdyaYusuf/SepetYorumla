using Microsoft.EntityFrameworkCore;
using SepetYorumla.Models.Entities;
using System.Reflection;

namespace SepetYorumla.DataAccess.Contexts;

public class BaseDbContext : DbContext
{
  public BaseDbContext(DbContextOptions<BaseDbContext> options) : base(options)
  {
    
  }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
  }

  public DbSet<Category> Categories { get; set; }
}
