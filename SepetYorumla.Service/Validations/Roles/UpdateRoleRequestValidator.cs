using FluentValidation;
using SepetYorumla.Models.Dtos.Roles.Requests;

namespace SepetYorumla.Service.Validations.Roles;

public class UpdateRoleRequestValidator : AbstractValidator<UpdateRoleRequest>
{
  public UpdateRoleRequestValidator()
  {
    RuleFor(r => r.Id)
      .GreaterThan(0).WithMessage("Geçersiz rol ID.");

    RuleFor(r => r.Name)
      .NotEmpty().WithMessage("Rol adı boş olamaz.")
      .MinimumLength(2).WithMessage("Rol adı en az 2 karakter olmalıdır.")
      .MaximumLength(50).WithMessage("Rol adı 50 karakterden uzun olamaz.");
  }
}