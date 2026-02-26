using FluentValidation;
using SepetYorumla.Models.Dtos.Comments.Requests;

namespace SepetYorumla.Service.Validations.Comments;

public class UpdateCommentRequestValidator : AbstractValidator<UpdateCommentRequest>
{
  public UpdateCommentRequestValidator()
  {
    RuleFor(c => c.Id)
      .GreaterThan(0).WithMessage("Geçersiz yorum ID.");

    RuleFor(c => c.Text)
      .NotEmpty().WithMessage("Yorum metni boş olamaz.")
      .MinimumLength(2).WithMessage("Yorum en az 2 karakter olmalıdır.")
      .MaximumLength(1000).WithMessage("Yorum en fazla 1000 karakter olabilir.");
  }
}
