using Microsoft.EntityFrameworkCore;
using SepetYorumla.Models.Entities;
using System.Reflection;

namespace SepetYorumla.DataAccess.Contexts;

public class BaseDbContext : DbContext
{
  public BaseDbContext(DbContextOptions<BaseDbContext> options) : base(options)
  {
    
  }

  public DbSet<Category> Categories { get; set; }
  public DbSet<Product> Products { get; set; }
  public DbSet<Basket> Baskets { get; set; }
  public DbSet<Review> Reviews { get; set; }
  public DbSet<User> Users { get; set; }
  public DbSet<Comment> Comments { get; set; }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
  }
}
