using FluentValidation;
using SepetYorumla.Models.Dtos.Products.Requests;

namespace SepetYorumla.Service.Validations.Products;

public class UpdateProductRequestValidator : AbstractValidator<UpdateProductRequest>
{
  public UpdateProductRequestValidator()
  {
    RuleFor(p => p.Id)
      .NotEmpty().WithMessage("Güncellenecek ürün ID'si boş olamaz.");

    RuleFor(p => p.Name)
      .NotEmpty().WithMessage("Ürün adı boş olamaz.")
      .MaximumLength(200).WithMessage("Ürün adı en fazla 200 karakter olabilir.");

    RuleFor(p => p.Price)
      .GreaterThan(0).WithMessage("Fiyat 0'dan büyük olmalıdır.");

    RuleFor(p => p.Description)
      .MaximumLength(1000).WithMessage("Açıklama 1000 karakterden fazla olamaz.");

    RuleFor(p => p.CategoryId)
      .GreaterThan(0).WithMessage("Geçersiz kategori seçimi.");
  }
}
