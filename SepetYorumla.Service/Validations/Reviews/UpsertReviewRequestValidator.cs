using FluentValidation;
using SepetYorumla.Models.Dtos.Reviews.Requests;

namespace SepetYorumla.Service.Validations.Reviews;

public class UpsertReviewRequestValidator : AbstractValidator<UpsertReviewRequest>
{
  public UpsertReviewRequestValidator()
  {
    RuleFor(r => r.StarRating)
      .InclusiveBetween(1, 5)
      .WithMessage("Puanlama 1 ile 5 arasında olmalıdır.")
      .When(r => r.StarRating.HasValue);

    RuleFor(r => r.BasketId)
      .NotEmpty()
      .WithMessage("İncelenecek sepet bilgisi gereklidir.");
  }
}
