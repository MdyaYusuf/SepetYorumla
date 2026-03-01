using SepetYorumla.Core.Exceptions;
using SepetYorumla.Core.Security;
using SepetYorumla.Models.Entities;

namespace SepetYorumla.Service.BusinessRules;

public class AuthenticationBusinessRules
{
  public void UserCredentialsMustMatch(User? user, string password)
  {
    if (user == null || !HashingHelper.VerifyPasswordHash(password, user.PasswordHash, user.PasswordKey))
    {
      throw new BusinessException("Eposta veya şifre hatalı.");
    }
  }

  public void RefreshTokenMustBeValid(User? user)
  {
    if (user == null || user.RefreshTokenExpiration < DateTime.Now)
    {
      throw new AuthorizationException("Oturum süresi dolmuş, lütfen tekrar giriş yapın.");
    }
  }

  public void RefreshTokenUserMustExist(User? user)
  {
    if (user == null)
    {
      throw new NotFoundException("Token bulunamadı.");
    }
  }
}