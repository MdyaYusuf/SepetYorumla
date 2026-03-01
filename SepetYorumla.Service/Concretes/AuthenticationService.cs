using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using SepetYorumla.Core.Responses;
using SepetYorumla.Core.Security;
using SepetYorumla.DataAccess.Abstracts;
using SepetYorumla.Models.Dtos.Tokens.Responses;
using SepetYorumla.Models.Dtos.Users.Requests;
using SepetYorumla.Models.Dtos.Users.Responses;
using SepetYorumla.Models.Entities;
using SepetYorumla.Models.Mapping;
using SepetYorumla.Service.Abstracts;
using SepetYorumla.Service.BusinessRules;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace SepetYorumla.Service.Concretes;

public class AuthenticationService(
  IUserRepository _userRepository,
  UserBusinessRules _businessRules,
  AuthenticationBusinessRules _authenticationBusinessRules,
  GeneralMapper _mapper,
  IUnitOfWork _unitOfWork,
  IValidator<RegisterUserRequest> _registerValidator,
  IOptions<TokenOptions> _tokenOptions,
  IHttpContextAccessor _httpContextAccessor) : IAuthenticationService
{
  private readonly TokenOptions _options = _tokenOptions.Value;

  public async Task<ReturnModel<TokenResponseDto>> RefreshTokenAsync(string? refreshToken, CancellationToken cancellationToken)
  {
    var token = refreshToken ?? _httpContextAccessor.HttpContext?.Request.Cookies["refreshToken"];

    var user = await _userRepository.GetAsync(u => u.RefreshToken == token);

    _authenticationBusinessRules.RefreshTokenMustBeValid(user);

    var tokenResponse = CreateToken(user!);

    user!.RefreshToken = GenerateRefreshToken();
    user.RefreshTokenExpiration = DateTime.Now.AddDays(_options.RefreshTokenExpiration);

    SetRefreshTokenCookie(user.RefreshToken, user.RefreshTokenExpiration.Value);

    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<TokenResponseDto>()
    {
      Data = tokenResponse,
      Success = true,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<NoData>> RevokeRefreshTokenAsync(string? refreshToken, CancellationToken cancellationToken)
  {
    var token = refreshToken ?? _httpContextAccessor.HttpContext?.Request.Cookies["refreshToken"];

    var user = await _userRepository.GetAsync(u => u.RefreshToken == token);

    _authenticationBusinessRules.RefreshTokenUserMustExist(user);

    user!.RefreshToken = null;
    user.RefreshTokenExpiration = null;
    _httpContextAccessor.HttpContext?.Response.Cookies.Delete("refreshToken");

    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<NoData>()
    {
      Success = true,
      StatusCode = 200,
      Message = "Oturum başarıyla sonlandırıldı."
    };
  }

  public async Task<ReturnModel<TokenResponseDto>> LoginAsync(LoginRequest request, CancellationToken cancellationToken)
  {
    var user = await _userRepository.GetAsync(u => u.Email == request.Email);

    _authenticationBusinessRules.UserCredentialsMustMatch(user, request.Password);

    var tokenResponse = CreateToken(user!);

    user!.RefreshToken = GenerateRefreshToken();
    user.RefreshTokenExpiration = DateTime.Now.AddDays(_options.RefreshTokenExpiration);

    SetRefreshTokenCookie(user.RefreshToken, user.RefreshTokenExpiration.Value);

    _userRepository.Update(user);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<TokenResponseDto>()
    {
      Data = tokenResponse,
      Success = true,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<UserResponseDto>> RegisterAsync(RegisterUserRequest request, CancellationToken cancellationToken = default)
  {
    var validationResult = await _registerValidator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    await _businessRules.EmailMustBeUniqueAsync(request.Email, cancellationToken: cancellationToken);
    await _businessRules.UsernameMustBeUniqueAsync(request.Username, cancellationToken: cancellationToken);

    User createdUser = _mapper.CreateToEntity(request);

    HashingHelper.CreatePasswordHash(request.Password, out string hash, out string key);
    createdUser.PasswordHash = hash;
    createdUser.PasswordKey = key;

    await _userRepository.AddAsync(createdUser, cancellationToken);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<UserResponseDto>()
    {
      Success = true,
      Message = "Kullanıcı başarıyla kaydedildi.",
      Data = _mapper.EntityToResponseDto(createdUser),
      StatusCode = 201
    };
  }

  private void SetRefreshTokenCookie(string token, DateTime expires)
  {
    var isDevelopment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development";

    var cookieOptions = new CookieOptions
    {
      HttpOnly = true,
      Secure = !isDevelopment,
      SameSite = SameSiteMode.Strict,
      Expires = expires,
      Path = "/api/Authentication"
    };

    _httpContextAccessor.HttpContext?.Response.Cookies.Append("refreshToken", token, cookieOptions);
  }

  private string GenerateRefreshToken()
  {
    byte[] randomBytes = RandomNumberGenerator.GetBytes(64);

    return Convert.ToBase64String(randomBytes);
  }

  private TokenResponseDto CreateToken(User user)
  {
    var claims = new List<Claim>()
    {
      new(ClaimTypes.NameIdentifier, user.Id.ToString()),
      new(ClaimTypes.Email, user.Email),
      new(ClaimTypes.Name, user.Username)
    };

    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_options.SecurityKey));
    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
    var expiration = DateTime.Now.AddMinutes(_options.AccessTokenExpiration);

    var token = new JwtSecurityToken(
      issuer: _options.Issuer,
      audience: _options.Audience,
      claims: claims,
      expires: expiration,
      signingCredentials: creds
    );

    return new TokenResponseDto(
      new JwtSecurityTokenHandler().WriteToken(token),
      expiration
    );
  }
}
