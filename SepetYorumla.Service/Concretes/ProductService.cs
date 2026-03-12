using FluentValidation;
using Microsoft.EntityFrameworkCore;
using SepetYorumla.Core.Responses;
using SepetYorumla.DataAccess.Abstracts;
using SepetYorumla.Models.Dtos.Products.Requests;
using SepetYorumla.Models.Dtos.Products.Responses;
using SepetYorumla.Models.Entities;
using SepetYorumla.Models.Mapping;
using SepetYorumla.Service.Abstracts;
using SepetYorumla.Service.BusinessRules;
using System.Linq.Expressions;

namespace SepetYorumla.Service.Concretes;

public class ProductService(
  IProductRepository _productRepository,
  ProductBusinessRules _businessRules,
  GeneralMapper _mapper,
  IUnitOfWork _unitOfWork,
  IValidator<CreateProductRequest> _createValidator,
  IValidator<UpdateProductRequest> _updateValidator) : IProductService
{
  public async Task<ReturnModel<List<ProductResponseDto>>> GetAllAsync(
    Expression<Func<Product, bool>>? filter = null,
    Func<IQueryable<Product>, IQueryable<Product>>? include = null,
    Func<IQueryable<Product>, IOrderedQueryable<Product>>? orderBy = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default)
  {
    List<Product> products = await _productRepository.GetAllAsync(
      filter,
      include: query => query.Include(p => p.Category).Include(p => p.Basket),
      orderBy,
      enableTracking,
      withDeleted,
      cancellationToken);

    List<ProductResponseDto> response = _mapper.EntityToResponseDtoList(products);

    return new ReturnModel<List<ProductResponseDto>>()
    {
      Success = true,
      Message = "Ürün listesi başarılı bir şekilde getirildi.",
      Data = response,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<ProductResponseDto>> GetAsync(
    Expression<Func<Product, bool>> predicate,
    Func<IQueryable<Product>, IQueryable<Product>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default)
  {
    var product = await _productRepository.GetAsync(
        predicate,
        include ?? (p => p.Include(x => x.Category).Include(p => p.Basket)),
        enableTracking,
        cancellationToken);

    if (product == null)
    {
      return new ReturnModel<ProductResponseDto>()
      {
        Success = true,
        Message = "Eşleşen ürün bulunamadı.",
        Data = null,
        StatusCode = 200
      };
    }

    var response = _mapper.EntityToResponseDto(product);

    return new ReturnModel<ProductResponseDto>()
    {
      Success = true,
      Message = "Ürün başarılı bir şekilde getirildi.",
      Data = response,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<ProductResponseDto>> GetByIdAsync(
    Guid id,
    Func<IQueryable<Product>, IQueryable<Product>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default)
  {
    Product product = await _businessRules.GetProductIfExistAsync(
      id,
      include: p => p.Include(p => p.Category).Include(p => p.Basket),
      enableTracking: false,
      cancellationToken: cancellationToken);

    ProductResponseDto response = _mapper.EntityToResponseDto(product);

    return new ReturnModel<ProductResponseDto>()
    {
      Success = true,
      Message = $"{id} numaralı ürün başarılı bir şekilde getirildi.",
      Data = response,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<CreatedProductResponseDto>> AddAsync(CreateProductRequest request, Guid userId, CancellationToken cancellationToken = default)
  {
    var validationResult = await _createValidator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    await _businessRules.UserMustOwnBasketAsync(request.BasketId, userId, cancellationToken);
    await _businessRules.BasketMustExistAsync(request.BasketId, cancellationToken);
    await _businessRules.CategoryMustExistAsync(request.CategoryId, cancellationToken);
    await _businessRules.ProductNameMustBeUniqueAsync(request.Name, cancellationToken: cancellationToken);

    Product createdProduct = _mapper.CreateToEntity(request);

    await _productRepository.AddAsync(createdProduct, cancellationToken);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    CreatedProductResponseDto response = _mapper.EntityToCreatedResponseDto(createdProduct);

    return new ReturnModel<CreatedProductResponseDto>()
    {
      Success = true,
      Message = "Ürün başarılı bir şekilde eklendi.",
      Data = response,
      StatusCode = 201
    };
  }

  public async Task<ReturnModel<NoData>> RemoveAsync(Guid id, Guid userId, string userRole, CancellationToken cancellationToken = default)
  {
    Product product = await _businessRules.GetProductIfExistAsync(
      id,
      include: q => q.Include(p => p.Basket),
      enableTracking: true,
      cancellationToken: cancellationToken);

    _businessRules.UserMustOwnProductBasket(product, userId, userRole);

    _productRepository.Delete(product);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<NoData>()
    {
      Success = true,
      Message = "Ürün başarılı bir şekilde silindi.",
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<NoData>> UpdateAsync(UpdateProductRequest request, Guid userId, CancellationToken cancellationToken = default)
  {
    var validationResult = await _updateValidator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    Product existingProduct = await _businessRules.GetProductIfExistAsync(
      request.Id,
      include: q => q.Include(p => p.Basket),
      enableTracking: true,
      cancellationToken: cancellationToken);

    _businessRules.OnlyUserCanEditProduct(existingProduct, userId);

    if (existingProduct.BasketId != request.BasketId)
    {
      await _businessRules.BasketMustExistAsync(request.BasketId, cancellationToken);
      await _businessRules.UserMustOwnBasketAsync(request.BasketId, userId, cancellationToken);
    }

    if (existingProduct.CategoryId != request.CategoryId)
    {
      await _businessRules.CategoryMustExistAsync(request.CategoryId, cancellationToken);
    }

    if (existingProduct.Name != request.Name)
    {
      await _businessRules.ProductNameMustBeUniqueAsync(request.Name, request.Id, cancellationToken);
    }

    _mapper.UpdateEntityFromRequest(request, existingProduct);

    _productRepository.Update(existingProduct);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<NoData>()
    {
      Success = true,
      Message = "Ürün başarılı bir şekilde güncellendi.",
      StatusCode = 200
    };
  }
}
