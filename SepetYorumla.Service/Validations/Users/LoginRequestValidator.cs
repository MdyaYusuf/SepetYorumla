using FluentValidation;
using SepetYorumla.Models.Dtos.Users.Requests;

namespace SepetYorumla.Service.Validations.Users;

public class LoginRequestValidator : AbstractValidator<LoginRequest>
{
  public LoginRequestValidator()
  {
    RuleFor(u => u.Email)
      .NotEmpty().WithMessage("E-posta adresi gereklidir.")
      .EmailAddress().WithMessage("Geçerli bir e-posta formatı giriniz.");

    RuleFor(u => u.Password)
      .NotEmpty().WithMessage("Şifre gereklidir.");
  }
}
