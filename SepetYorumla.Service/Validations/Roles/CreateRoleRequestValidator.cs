using FluentValidation;
using SepetYorumla.Models.Dtos.Roles.Requests;

namespace SepetYorumla.Service.Validations.Roles;

public class CreateRoleRequestValidator : AbstractValidator<CreateRoleRequest>
{
  public CreateRoleRequestValidator()
  {
    RuleFor(r => r.Name)
      .NotEmpty().WithMessage("Rol adı boş olamaz.")
      .NotNull().WithMessage("Rol adı zorunludur.")
      .MinimumLength(2).WithMessage("Rol adı en az 2 karakter olmalıdır.")
      .MaximumLength(50).WithMessage("Rol adı 50 karakterden uzun olamaz.");
  }
}