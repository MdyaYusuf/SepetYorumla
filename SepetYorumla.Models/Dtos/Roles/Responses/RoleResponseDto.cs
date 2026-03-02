namespace SepetYorumla.Models.Dtos.Roles.Responses;

public sealed record RoleResponseDto
{
  public int Id { get; init; }
  public string Name { get; init; } = default!;
}
