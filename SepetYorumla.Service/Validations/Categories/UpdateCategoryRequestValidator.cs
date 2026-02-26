using FluentValidation;
using SepetYorumla.Models.Dtos.Categories.Requests;

namespace SepetYorumla.Service.Validations.Categories;

public class UpdateCategoryRequestValidator : AbstractValidator<UpdateCategoryRequest>
{
  public UpdateCategoryRequestValidator()
  {
    RuleFor(c => c.Id)
      .GreaterThan(0).WithMessage("Geçersiz kategori ID.");

    RuleFor(c => c.Name)
      .NotEmpty().WithMessage("Kategori adı boş olamaz.")
      .MinimumLength(2).WithMessage("Kategori adı en az 2 karakter olmalıdır.")
      .MaximumLength(50).WithMessage("Kategori adı 50 karakterden uzun olamaz.");
  }
}
