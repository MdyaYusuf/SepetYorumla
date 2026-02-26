using FluentValidation;
using SepetYorumla.Models.Dtos.Reviews.Requests;

namespace SepetYorumla.Service.Validations.Reviews;

public class UpdateReviewRequestValidator : AbstractValidator<UpdateReviewRequest>
{
  public UpdateReviewRequestValidator()
  {
    RuleFor(r => r.Id)
      .NotEmpty().WithMessage("İnceleme ID bilgisi gereklidir.");

    RuleFor(r => r.StarRating)
      .InclusiveBetween(1, 5).WithMessage("Puanlama 1 ile 5 arasında olmalıdır.");
  }
}
