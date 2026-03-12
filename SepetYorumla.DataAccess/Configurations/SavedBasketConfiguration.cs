using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SepetYorumla.Models.Entities;

namespace SepetYorumla.DataAccess.Configurations;

public class SavedBasketConfiguration : IEntityTypeConfiguration<SavedBasket>
{
  public void Configure(EntityTypeBuilder<SavedBasket> builder)
  {
    builder.ToTable("SavedBaskets");

    builder.HasKey(sb => sb.Id);

    builder.Property(sb => sb.Id)
      .HasColumnName("Id")
      .IsRequired();

    builder.Property(sb => sb.CreatedDate)
      .HasColumnName("CreatedDate")
      .IsRequired();

    builder.Property(sb => sb.UpdatedDate)
      .HasColumnName("UpdatedDate")
      .IsRequired(false);

    builder.Property(sb => sb.UserId)
      .IsRequired();

    builder.Property(sb => sb.BasketId)
      .IsRequired();

    builder.HasIndex(sb => new { sb.UserId, sb.BasketId })
      .IsUnique();

    builder.HasOne(sb => sb.User)
      .WithMany(u => u.SavedBaskets)
      .HasForeignKey(sb => sb.UserId)
      .OnDelete(DeleteBehavior.Cascade); // SQL Server handles this cleanup

    builder.HasOne(sb => sb.Basket)
      .WithMany(b => b.SavedBaskets)
      .HasForeignKey(sb => sb.BasketId)
      .OnDelete(DeleteBehavior.ClientCascade); // EF Core handles this cleanup
  }
}
