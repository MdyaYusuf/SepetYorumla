using SepetYorumla.Models.Dtos.Users.Responses;

namespace SepetYorumla.Models.Dtos.Tokens.Responses;

public record TokenResponseDto(
  string AccessToken,
  DateTime AccessTokenExpiration,
  UserResponseDto User);
