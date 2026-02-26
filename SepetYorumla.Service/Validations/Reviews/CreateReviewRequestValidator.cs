using FluentValidation;
using SepetYorumla.Models.Dtos.Reviews.Requests;

namespace SepetYorumla.Service.Validations.Reviews;

public class CreateReviewRequestValidator : AbstractValidator<CreateReviewRequest>
{
  public CreateReviewRequestValidator()
  {
    RuleFor(r => r.StarRating)
      .InclusiveBetween(1, 5).WithMessage("Puanlama 1 ile 5 arasında olmalıdır.");

    RuleFor(r => r.UserId)
      .NotEmpty().WithMessage("Kullanıcı bilgisi gereklidir.");

    RuleFor(r => r.BasketId)
      .NotEmpty().WithMessage("İncelenecek sepet bilgisi gereklidir.");
  }
}
