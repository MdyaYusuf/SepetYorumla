using FluentValidation;
using SepetYorumla.Core.Responses;
using SepetYorumla.DataAccess.Abstracts;
using SepetYorumla.Models.Dtos.Roles.Requests;
using SepetYorumla.Models.Dtos.Roles.Responses;
using SepetYorumla.Models.Entities;
using SepetYorumla.Models.Mapping;
using SepetYorumla.Service.Abstracts;
using SepetYorumla.Service.BusinessRules;
using System.Linq.Expressions;

namespace SepetYorumla.Service.Concretes;

public class RoleService(
  IRoleRepository _roleRepository,
  RoleBusinessRules _businessRules,
  GeneralMapper _mapper,
  IUnitOfWork _unitOfWork,
  IValidator<CreateRoleRequest> _createValidator,
  IValidator<UpdateRoleRequest> _updateValidator) : IRoleService
{
  public async Task<ReturnModel<List<RoleResponseDto>>> GetAllAsync(
    Expression<Func<Role, bool>>? filter = null,
    Func<IQueryable<Role>, IQueryable<Role>>? include = null,
    Func<IQueryable<Role>, IOrderedQueryable<Role>>? orderBy = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default)
  {
    List<Role> roles = await _roleRepository.GetAllAsync(
      filter,
      include,
      orderBy,
      enableTracking,
      withDeleted,
      cancellationToken);

    List<RoleResponseDto> response = _mapper.EntityToResponseDtoList(roles);

    return new ReturnModel<List<RoleResponseDto>>()
    {
      Success = true,
      Message = "Rol listesi başarıyla getirildi.",
      Data = response,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<RoleResponseDto>> GetAsync(
    Expression<Func<Role, bool>> predicate,
    Func<IQueryable<Role>, IQueryable<Role>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default)
  {
    var role = await _roleRepository.GetAsync(predicate, include, enableTracking, cancellationToken);

    if (role == null)
    {
      return new ReturnModel<RoleResponseDto>()
      {
        Success = true,
        Message = "Eşleşen rol bulunamadı.",
        Data = null,
        StatusCode = 200
      };
    }

    var response = _mapper.EntityToResponseDto(role);

    return new ReturnModel<RoleResponseDto>()
    {
      Success = true,
      Message = "Rol başarılı bir şekilde getirildi.",
      Data = response,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<RoleResponseDto>> GetByIdAsync(
    int id,
    Func<IQueryable<Role>,IQueryable<Role>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default)
  {
    Role role = await _businessRules.GetRoleIfExistAsync(id, include, enableTracking, cancellationToken);

    RoleResponseDto response = _mapper.EntityToResponseDto(role);

    return new ReturnModel<RoleResponseDto>()
    {
      Success = true,
      Message = $"{id} numaralı rol başarılı bir şekilde getirildi.",
      Data = response,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<RoleResponseDto>> AddAsync(CreateRoleRequest request, CancellationToken cancellationToken = default)
  {
    var validationResult = await _createValidator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    await _businessRules.NameMustBeUniqueAsync(request.Name, cancellationToken);

    Role createdRole = _mapper.CreateToEntity(request);

    await _roleRepository.AddAsync(createdRole, cancellationToken);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    RoleResponseDto response = _mapper.EntityToResponseDto(createdRole);

    return new ReturnModel<RoleResponseDto>()
    {
      Success = true,
      Message = "Rol başarılı bir şekilde eklendi.",
      Data = response,
      StatusCode = 201
    };
  }

  public async Task<ReturnModel<NoData>> RemoveAsync(int id, CancellationToken cancellationToken = default)
  {
    Role role = await _businessRules.GetRoleIfExistAsync(id, enableTracking: true, cancellationToken: cancellationToken);

    _roleRepository.Delete(role);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<NoData>()
    {
      Success = true,
      Message = "Rol başarıyla silindi.",
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<NoData>> UpdateAsync(UpdateRoleRequest request, CancellationToken cancellationToken = default)
  {
    var validationResult = await _updateValidator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    Role existingRole = await _businessRules.GetRoleIfExistAsync(request.Id, enableTracking: true, cancellationToken: cancellationToken);

    _mapper.UpdateEntityFromRequest(request, existingRole);

    _roleRepository.Update(existingRole);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<NoData>()
    {
      Success = true,
      Message = "Rol başarıyla güncellendi.",
      StatusCode = 200
    };
  }
}