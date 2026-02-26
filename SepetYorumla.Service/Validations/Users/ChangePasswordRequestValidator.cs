using FluentValidation;
using SepetYorumla.Models.Dtos.Users.Requests;

namespace SepetYorumla.Service.Validations.Users;

public class ChangePasswordRequestValidator : AbstractValidator<ChangePasswordRequest>
{
  public ChangePasswordRequestValidator()
  {
    RuleFor(u => u.CurrentPassword).NotEmpty().WithMessage("Mevcut şifrenizi giriniz.");

    RuleFor(u => u.NewPassword)
      .NotEmpty().WithMessage("Yeni şifre boş olamaz.")
      .MinimumLength(8).WithMessage("Yeni şifre en az 8 karakter olmalıdır.")
      .NotEqual(u => u.CurrentPassword).WithMessage("Yeni şifre mevcut şifre ile aynı olamaz.");

    RuleFor(u => u.ConfirmNewPassword)
      .Equal(u => u.NewPassword).WithMessage("Şifreler eşleşmiyor.");
  }
}
