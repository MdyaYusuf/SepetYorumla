using FluentValidation;
using SepetYorumla.Models.Dtos.Comments.Requests;

namespace SepetYorumla.Service.Validations.Comments;

public class CreateCommentRequestValidator : AbstractValidator<CreateCommentRequest>
{
  public CreateCommentRequestValidator()
  {
    RuleFor(c => c.Text)
      .NotEmpty().WithMessage("Yorum metni boş olamaz.")
      .MinimumLength(2).WithMessage("Yorum en az 2 karakter olmalıdır.")
      .MaximumLength(1000).WithMessage("Yorum en fazla 1000 karakter olabilir.");

    RuleFor(c => c.BasketId)
      .NotEmpty().WithMessage("Sepet bilgisi eksik.");
  }
}
