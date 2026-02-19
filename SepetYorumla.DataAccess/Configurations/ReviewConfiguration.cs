using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SepetYorumla.Models.Entities;

namespace SepetYorumla.DataAccess.Configurations;

public class ReviewConfiguration : IEntityTypeConfiguration<Review>
{
  public void Configure(EntityTypeBuilder<Review> builder)
  {
    builder.ToTable("Reviews");

    builder.HasKey(r => r.Id);

    builder.Property(r => r.Comment)
      .HasMaxLength(1000)
      .IsRequired(false);

    builder.Property(r => r.StarRating)
      .HasPrecision(3, 1)
      .IsRequired();

    builder.Property(r => r.IsThumbsUp)
      .IsRequired();

    builder.Property(r => r.IsActive)
      .HasDefaultValue(true)
      .IsRequired();

    builder.HasOne(r => r.Basket)
      .WithMany(b => b.Reviews)
      .HasForeignKey(r => r.BasketId)
      .OnDelete(DeleteBehavior.Cascade);
  }
}
