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

    builder.Property(r => r.Id)
      .HasColumnName("Id")
      .IsRequired();

    builder.Property(r => r.CreatedDate)
      .HasColumnName("CreatedDate")
      .IsRequired();

    builder.Property(r => r.UpdatedDate)
      .HasColumnName("UpdatedDate")
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

    builder.HasOne(r => r.User)
      .WithMany(u => u.Reviews)
      .HasForeignKey(r => r.UserId)
      .OnDelete(DeleteBehavior.Cascade);
  }
}
