namespace SepetYorumla.Models.Dtos.Baskets.Requests;

public sealed record CreateBasketRequest(string Title, string? Description, Guid UserId);