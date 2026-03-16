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
  public DbSet<SavedBasket> SavedBaskets { get; set; }
  public DbSet<Follow> Follows { get; set; }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
  }
}
