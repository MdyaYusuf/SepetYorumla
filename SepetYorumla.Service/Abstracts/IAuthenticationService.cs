using SepetYorumla.Core.Responses;
using SepetYorumla.Models.Dtos.Tokens.Responses;
using SepetYorumla.Models.Dtos.Users.Requests;
using SepetYorumla.Models.Dtos.Users.Responses;

namespace SepetYorumla.Service.Abstracts;

public interface IAuthenticationService
{
  Task<ReturnModel<TokenResponseDto>> RefreshTokenAsync(CancellationToken cancellationToken, string? refreshToken = null);
  Task<ReturnModel<NoData>> RevokeRefreshTokenAsync(CancellationToken cancellationToken, string? refreshToken = null);
  Task<ReturnModel<TokenResponseDto>> LoginAsync(LoginRequest request, CancellationToken cancellationToken);

  Task<ReturnModel<CreatedUserResponseDto>> RegisterAsync(
    RegisterUserRequest request,
    CancellationToken cancellationToken = default);
}
