using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SepetYorumla.Models.Entities;

namespace SepetYorumla.DataAccess.Configurations;

public class ProductConfiguration : IEntityTypeConfiguration<Product>
{
  public void Configure(EntityTypeBuilder<Product> builder)
  {
    builder.ToTable("Products");

    builder.HasKey(p => p.Id);

    builder.Property(p => p.Name)
      .HasMaxLength(200)
      .IsRequired();

    builder.Property(p => p.Price)
      .HasPrecision(18, 2)
      .IsRequired();

    builder.Property(p => p.StoreName)
      .HasMaxLength(100)
      .IsRequired(false);

    builder.Property(p => p.ImageUrl)
      .HasMaxLength(500)
      .IsRequired(false);

    builder.Property(p => p.Brand)
      .HasMaxLength(100);

    builder.Property(p => p.Model)
      .HasMaxLength(100);

    builder.Property(p => p.IsActive)
      .HasDefaultValue(true)
      .IsRequired();

    builder.HasOne(p => p.Basket)
      .WithMany(b => b.Products)
      .HasForeignKey(p => p.BasketId)
      .OnDelete(DeleteBehavior.Cascade);

    builder.HasOne(p => p.Category)
      .WithMany(c => c.Products)
      .HasForeignKey(p => p.CategoryId)
      .OnDelete(DeleteBehavior.Restrict);
  }
}
