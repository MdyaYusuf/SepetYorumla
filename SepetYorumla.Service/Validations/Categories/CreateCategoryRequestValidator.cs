using FluentValidation;
using SepetYorumla.Models.Dtos.Categories.Requests;

namespace SepetYorumla.Service.Validations.Categories;

public class CreateCategoryRequestValidator : AbstractValidator<CreateCategoryRequest>
{
  public CreateCategoryRequestValidator()
  {
    RuleFor(c => c.Name)
      .NotEmpty().WithMessage("Kategori adı boş olamaz.")
      .NotNull().WithMessage("Kategori adı zorunludur.")
      .MinimumLength(2).WithMessage("Kategori adı en az 2 karakter olmalıdır.")
      .MaximumLength(50).WithMessage("Kategori adı 50 karakterden uzun olamaz.");
  }
}
