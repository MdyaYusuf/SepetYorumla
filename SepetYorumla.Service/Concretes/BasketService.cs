using FluentValidation;
using Microsoft.EntityFrameworkCore;
using SepetYorumla.Core.Responses;
using SepetYorumla.DataAccess.Abstracts;
using SepetYorumla.Models.Dtos.Baskets.Requests;
using SepetYorumla.Models.Dtos.Baskets.Responses;
using SepetYorumla.Models.Entities;
using SepetYorumla.Models.Mapping;
using SepetYorumla.Service.Abstracts;
using SepetYorumla.Service.BusinessRules;
using SepetYorumla.Service.Helpers;
using System.Linq.Expressions;

namespace SepetYorumla.Service.Concretes;

public class BasketService(
  IBasketRepository _basketRepository,
  BasketBusinessRules _businessRules,
  GeneralMapper _mapper,
  IUnitOfWork _unitOfWork,
  IValidator<CreateBasketRequest> _createValidator,
  IValidator<UpdateBasketRequest> _updateValidator) : IBasketService
{
  public async Task<ReturnModel<List<BasketResponseDto>>> GetAllAsync(
    Expression<Func<Basket, bool>>? filter = null,
    Func<IQueryable<Basket>, IQueryable<Basket>>? include = null,
    Func<IQueryable<Basket>, IOrderedQueryable<Basket>>? orderBy = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default)
  {
    var baskets = await _basketRepository.GetAllAsync(
      filter,
      include ?? (query => query.Include(b => b.User).Include(b => b.Products).ThenInclude(p => p.Category)),
      orderBy,
      enableTracking,
      withDeleted,
      cancellationToken);

    var response = _mapper.EntityToResponseDtoList(baskets);

    return new ReturnModel<List<BasketResponseDto>>()
    {
      Success = true,
      Message = "Sepet listesi başarıyla getirildi.",
      Data = response,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<BasketResponseDto>> GetAsync(
    Expression<Func<Basket, bool>> predicate,
    Func<IQueryable<Basket>, IQueryable<Basket>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default)
  {
    var basket = await _basketRepository.GetAsync(
      predicate,
      include: query => query.Include(b => b.User).Include(b => b.Products).ThenInclude(p => p.Category),
      enableTracking,
      cancellationToken);

    if (basket == null)
    {
      return new ReturnModel<BasketResponseDto>()
      {
        Success = true,
        Message = "Eşleşen sepet bulunamadı.",
        Data = null,
        StatusCode = 200
      };
    }

    var response = _mapper.EntityToResponseDto(basket);

    return new ReturnModel<BasketResponseDto>()
    {
      Success = true,
      Message = "Sepet başarıyla getirildi.",
      Data = response,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<BasketResponseDto>> GetByIdAsync(
    Guid id,
    Func<IQueryable<Basket>, IQueryable<Basket>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default)
  {
    var basket = await _businessRules.GetBasketIfExistAsync(
      id,
      include: query => query.Include(b => b.User).Include(b => b.Products).ThenInclude(p => p.Category),
      enableTracking,
      cancellationToken);

    var response = _mapper.EntityToResponseDto(basket);

    return new ReturnModel<BasketResponseDto>()
    {
      Success = true,
      Message = $"{id} numaralı sepet başarıyla getirildi.",
      Data = response,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<CreatedBasketResponseDto>> AddAsync(CreateBasketRequest request, Guid userId, CancellationToken cancellationToken = default)
  {
    var validationResult = await _createValidator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    var createdBasket = new Basket()
    {
      Title = request.Title,
      Description = request.Description,
      UserId = userId
    };

    foreach (var productDto in request.Products)
    {
      var productEntity = _mapper.ProductDtoToEntity(productDto);

      if (productDto.ImageFile != null && productDto.ImageFile.Length > 0)
      {
        _businessRules.ValidateProductImage(productDto.ImageFile);

        productEntity.ImageUrl = await FileHelper.SaveImageToDisk(productDto.ImageFile, "products", productDto.Name, cancellationToken);
      }

      createdBasket.Products.Add(productEntity);
    }

    await _basketRepository.AddAsync(createdBasket, cancellationToken);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    var response = _mapper.EntityToCreatedResponseDto(createdBasket);

    return new ReturnModel<CreatedBasketResponseDto>()
    {
      Success = true,
      Message = "Sepet başarıyla oluşturuldu.",
      Data = response,
      StatusCode = 201
    };
  }

  public async Task<ReturnModel<NoData>> RemoveAsync(Guid id, Guid userId, string userRole, CancellationToken cancellationToken = default)
  {
    var basket = await _businessRules.GetBasketIfExistAsync(id, enableTracking: true, cancellationToken: cancellationToken);

    _businessRules.UserMustOwnBasketOrBeAdmin(basket, userId, userRole);

    _basketRepository.Delete(basket);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<NoData>()
    {
      Success = true,
      Message = "Sepet başarıyla silindi.",
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<NoData>> UpdateAsync(UpdateBasketRequest request, Guid userId, CancellationToken cancellationToken = default)
  {
    var validationResult = await _updateValidator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    var existingBasket = await _businessRules.GetBasketIfExistAsync(request.Id, enableTracking: true, cancellationToken: cancellationToken);

    _businessRules.OnlyUserCanEditBasket(existingBasket, userId);

    _mapper.UpdateEntityFromRequest(request, existingBasket);

    _basketRepository.Update(existingBasket);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<NoData>()
    {
      Success = true,
      Message = "Sepet başarıyla güncellendi.",
      StatusCode = 200
    };
  }
}