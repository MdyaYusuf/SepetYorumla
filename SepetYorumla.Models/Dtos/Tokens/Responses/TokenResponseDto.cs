namespace SepetYorumla.Models.Dtos.Tokens.Responses;

public record TokenResponseDto(
  string AccessToken,
  DateTime AccessTokenExpiration);
