namespace SepetYorumla.Models.Dtos.Baskets.Responses;

public sealed record BasketResponseDto(Guid Id, string Title, string? Description, Guid UserId);
