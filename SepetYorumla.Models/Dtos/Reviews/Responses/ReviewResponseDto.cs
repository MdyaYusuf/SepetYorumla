namespace SepetYorumla.Models.Dtos.Reviews.Responses;

public sealed record ReviewResponseDto(Guid Id, decimal StarRating, bool IsThumbsUp, Guid UserId, Guid BasketId);
