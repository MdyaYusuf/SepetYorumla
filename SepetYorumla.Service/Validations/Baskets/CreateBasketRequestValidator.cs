using FluentValidation;
using SepetYorumla.Models.Dtos.Baskets.Requests;

namespace SepetYorumla.Service.Validations.Baskets;

public class CreateBasketRequestValidator : AbstractValidator<CreateBasketRequest>
{
  public CreateBasketRequestValidator()
  {
    RuleFor(b => b.Title)
      .NotEmpty().WithMessage("Sepet başlığı boş olamaz.")
      .MaximumLength(100).WithMessage("Sepet başlığı en fazla 100 karakter olabilir.");

    RuleFor(b => b.Description)
      .MaximumLength(500).WithMessage("Açıklama en fazla 500 karakter olabilir.");

    RuleFor(b => b.UserId)
      .NotEmpty().WithMessage("Kullanıcı ID boş olamaz.");
  }
}
