using FluentValidation;
using SepetYorumla.Models.Dtos.Users.Requests;

namespace SepetYorumla.Service.Validations.Users;

public class UpdateUserRequestValidator : AbstractValidator<UpdateUserRequest>
{
  public UpdateUserRequestValidator()
  {
    RuleFor(u => u.Id).NotEmpty().WithMessage("Kullanıcı ID bilgisi gereklidir.");

    RuleFor(u => u.Username)
      .NotEmpty().WithMessage("Kullanıcı adı boş olamaz.")
      .MinimumLength(3).WithMessage("Kullanıcı adı en az 3 karakter olmalıdır.");

    RuleFor(u => u.Email)
      .NotEmpty().WithMessage("E-posta adresi boş olamaz.")
      .EmailAddress().WithMessage("Geçerli bir e-posta adresi giriniz.");

    RuleFor(u => u.Bio)
      .MaximumLength(1000).WithMessage("Bio en fazla 1000 karakter olabilir.");
  }
}
