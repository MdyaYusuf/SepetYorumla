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
      include: p => p.Include(p => p.Category),
      cancellationToken: cancellationToken);

    List<ProductResponseDto> response = _mapper.EntityToResponseDtoList(products);

    return new ReturnModel<List<ProductResponseDto>>
    {
      Success = true,
      Message = "Ürün listesi başarılı bir şekilde getirildi.",
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
      include: p => p.Include(p => p.Category),
      enableTracking: false,
      cancellationToken: cancellationToken);

    ProductResponseDto response = _mapper.EntityToResponseDto(product);

    return new ReturnModel<ProductResponseDto>
    {
      Success = true,
      Message = $"{id} numaralı ürün başarılı bir şekilde getirildi.",
      Data = response,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<ProductResponseDto>> AddAsync(CreateProductRequest request, CancellationToken cancellationToken = default)
  {
    var validationResult = await _createValidator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    await _businessRules.ProductNameMustBeUniqueAsync(request.Name, cancellationToken: cancellationToken);
    await _businessRules.CategoryMustExistAsync(request.CategoryId, cancellationToken);

    Product createdProduct = _mapper.CreateToEntity(request);

    await _productRepository.AddAsync(createdProduct, cancellationToken);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    ProductResponseDto response = _mapper.EntityToResponseDto(createdProduct);

    return new ReturnModel<ProductResponseDto>
    {
      Success = true,
      Message = "Ürün başarılı bir şekilde eklendi.",
      Data = response,
      StatusCode = 201
    };
  }

  public async Task<ReturnModel<NoData>> RemoveAsync(Guid id, CancellationToken cancellationToken = default)
  {
    Product product = await _businessRules.GetProductIfExistAsync(id, enableTracking: true, cancellationToken: cancellationToken);

    _productRepository.Delete(product);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<NoData>
    {
      Success = true,
      Message = "Ürün başarılı bir şekilde silindi.",
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<NoData>> UpdateAsync(UpdateProductRequest request, CancellationToken cancellationToken = default)
  {
    var validationResult = await _updateValidator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    Product existingProduct = await _businessRules.GetProductIfExistAsync(
      request.Id,
      enableTracking: true,
      cancellationToken: cancellationToken);

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

    return new ReturnModel<NoData>
    {
      Success = true,
      Message = "Ürün başarılı bir şekilde güncellendi.",
      StatusCode = 200
    };
  }
}
