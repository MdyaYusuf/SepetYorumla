using FluentValidation;
using SepetYorumla.Models.Dtos.Products.Requests;

namespace SepetYorumla.Service.Validations.Products;

public class CreateProductRequestValidator : AbstractValidator<CreateProductRequest>
{
  public CreateProductRequestValidator()
  {
    RuleFor(p => p.Name)
      .NotEmpty().WithMessage("Ürün adı boş olamaz.")
      .Length(2, 100).WithMessage("Ürün adı 2-100 karakter arasında olmalıdır.");

    RuleFor(p => p.Price)
      .GreaterThan(0).WithMessage("Ürün fiyatı 0'dan büyük olmalıdır.")
      .PrecisionScale(18, 2, false).WithMessage("Fiyat formatı geçersiz.");

    RuleFor(p => p.CategoryId)
      .NotEmpty().WithMessage("Bir kategori seçilmelidir.")
      .GreaterThan(0).WithMessage("Geçersiz kategori seçimi.");

    RuleFor(p => p.Description)
      .MaximumLength(1000).WithMessage("Açıklama 1000 karakterden fazla olamaz.");
  }
}
