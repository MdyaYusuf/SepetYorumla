namespace SepetYorumla.Models.Dtos.Baskets.Requests;

public sealed record UpdateBasketRequest(Guid Id, string Title, string? Description);
