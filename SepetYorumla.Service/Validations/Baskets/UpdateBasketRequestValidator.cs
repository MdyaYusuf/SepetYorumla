using FluentValidation;
using SepetYorumla.Models.Dtos.Baskets.Requests;

namespace SepetYorumla.Service.Validations.Baskets;

public class UpdateBasketRequestValidator : AbstractValidator<UpdateBasketRequest>
{
  public UpdateBasketRequestValidator()
  {
    RuleFor(b => b.Id).NotEmpty();

    RuleFor(b => b.Title)
      .NotEmpty().WithMessage("Sepet başlığı boş olamaz.")
      .MaximumLength(100).WithMessage("Sepet başlığı en fazla 100 karakter olabilir.");

    RuleFor(b => b.Description)
      .MaximumLength(500).WithMessage("Açıklama en fazla 500 karakter olabilir.");

    RuleFor(x => x.Products)
      .NotEmpty().WithMessage("Sepette en az bir ürün bulunmalıdır.")
      .Must(p => p.Count >= 2 && p.Count <= 4)
      .WithMessage("Bir sepet en az 2, en fazla 4 ürün içerebilir.");

    RuleForEach(x => x.Products).ChildRules(product =>
    {
      product.RuleFor(p => p.Name)
        .NotEmpty().WithMessage("Ürün adı boş olamaz.");

      product.RuleFor(p => p.Price)
        .GreaterThan(0).WithMessage("Ürün fiyatı 0'dan büyük olmalıdır.");

      product.RuleFor(p => p.CategoryId)
        .GreaterThan(0).WithMessage("Geçerli bir kategori seçilmelidir.");
    });
  }
}
