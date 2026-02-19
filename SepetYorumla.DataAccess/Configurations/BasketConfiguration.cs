using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SepetYorumla.Models.Entities;

namespace SepetYorumla.DataAccess.Configurations;

public class BasketConfiguration : IEntityTypeConfiguration<Basket>
{
  public void Configure(EntityTypeBuilder<Basket> builder)
  {
    builder.ToTable("Baskets");

    builder.HasKey(b => b.Id);

    builder.Property(b => b.Title)
      .HasMaxLength(150)
      .IsRequired();

    builder.Property(b => b.Description)
      .HasMaxLength(1000)
      .IsRequired(false);

    builder.Property(b => b.IsActive)
      .HasDefaultValue(true)
      .IsRequired();

    builder.HasIndex(b => b.Title);
  }
}
