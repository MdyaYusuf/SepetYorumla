using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SepetYorumla.Models.Entities;

namespace SepetYorumla.DataAccess.Configurations;

public class FollowConfiguration : IEntityTypeConfiguration<Follow>
{
  public void Configure(EntityTypeBuilder<Follow> builder)
  {
    builder.ToTable("Follows");

    builder.HasKey(f => f.Id);

    builder.Property(f => f.Id)
      .HasColumnName("Id")
      .IsRequired();

    builder.Property(f => f.CreatedDate)
      .HasColumnName("CreatedDate")
      .IsRequired();

    builder.Property(f => f.UpdatedDate)
      .HasColumnName("UpdatedDate")
      .IsRequired(false);

    builder.Property(f => f.FollowerId)
      .IsRequired();

    builder.Property(f => f.FollowingId)
      .IsRequired();

    builder.HasIndex(f => new { f.FollowerId, f.FollowingId })
      .IsUnique();

    builder.HasOne(f => f.Follower)
      .WithMany(u => u.Following)
      .HasForeignKey(f => f.FollowerId)
      .OnDelete(DeleteBehavior.Restrict);

    builder.HasOne(f => f.Following)
      .WithMany(u => u.Followers)
      .HasForeignKey(f => f.FollowingId)
      .OnDelete(DeleteBehavior.Restrict);
  }
}
