using SepetYorumla.Core.Responses;
using SepetYorumla.Models.Dtos.Tokens.Responses;
using SepetYorumla.Models.Dtos.Users.Requests;
using SepetYorumla.Models.Dtos.Users.Responses;

namespace SepetYorumla.Service.Abstracts;

public interface IAuthenticationService
{
  Task<ReturnModel<TokenResponseDto>> RefreshTokenAsync(string refreshToken, CancellationToken cancellationToken);
  Task<ReturnModel<NoData>> RevokeRefreshTokenAsync(string refreshToken, CancellationToken cancellationToken);
  Task<ReturnModel<TokenResponseDto>> LoginAsync(LoginRequest request, CancellationToken cancellationToken);

  Task<ReturnModel<UserResponseDto>> RegisterAsync(
    RegisterUserRequest request,
    CancellationToken cancellationToken = default);
}
