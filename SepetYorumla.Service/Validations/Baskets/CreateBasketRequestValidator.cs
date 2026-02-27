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

    RuleFor(b => b.Products)
            .NotEmpty().WithMessage("Bir sepet oluşturmak için en az bir ürün eklemelisiniz.")
            .Must(p => p != null && p.Count > 0).WithMessage("Sepet içeriği boş olamaz.");

    RuleForEach(b => b.Products).ChildRules(product =>
    {
      product.RuleFor(p => p.Name)
        .NotEmpty().WithMessage("Ürün adı boş olamaz.")
        .Length(2, 100).WithMessage("Ürün adı 2-100 karakter arasında olmalıdır.");

      product.RuleFor(p => p.Price)
        .GreaterThan(0).WithMessage("Ürün fiyatı 0'dan büyük olmalıdır.")
        .PrecisionScale(18, 2, false).WithMessage("Fiyat formatı geçersiz.");

      product.RuleFor(p => p.CategoryId)
        .NotEmpty().WithMessage("Bir kategori seçilmelidir.")
        .GreaterThan(0).WithMessage("Geçersiz kategori seçimi.");

      product.RuleFor(p => p.Description)
        .MaximumLength(1000).WithMessage("Açıklama 1000 karakterden fazla olamaz.");

      product.RuleFor(p => p.StoreName)
        .MaximumLength(100).WithMessage("Mağaza adı en fazla 100 karakter olabilir.");
    });
  }
}
