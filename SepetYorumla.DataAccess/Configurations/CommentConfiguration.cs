using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SepetYorumla.Models.Entities;

namespace SepetYorumla.DataAccess.Configurations;

public class CommentConfiguration : IEntityTypeConfiguration<Comment>
{
  public void Configure(EntityTypeBuilder<Comment> builder)
  {
    builder.ToTable("Comments");

    builder.HasKey(c => c.Id);

    builder.Property(c => c.Id)
      .HasColumnName("Id")
      .IsRequired();

    builder.Property(c => c.CreatedDate)
      .HasColumnName("CreatedDate")
      .IsRequired();

    builder.Property(c => c.UpdatedDate)
      .HasColumnName("UpdatedDate")
      .IsRequired(false);

    builder.Property(c => c.Text)
      .HasMaxLength(1000)
      .IsRequired();

    builder.Property(c => c.IsActive)
      .HasDefaultValue(true)
      .IsRequired();

    // To fix the "Multiple Cascade Path error" we share responsibilities between EF Core and SQL Server
    builder.HasOne(c => c.User)
      .WithMany(u => u.Comments)
      .HasForeignKey(c => c.UserId)
      .OnDelete(DeleteBehavior.ClientCascade); // EF Core handles this cleanup

    builder.HasOne(c => c.Basket)
      .WithMany(b => b.Comments)
      .HasForeignKey(c => c.BasketId)
      .OnDelete(DeleteBehavior.Cascade); // SQL Server handles this cleanup
  }
}
