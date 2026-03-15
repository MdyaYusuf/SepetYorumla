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
    Guid? userId = null,
    Expression<Func<Basket, bool>>? filter = null,
    Func<IQueryable<Basket>, IQueryable<Basket>>? include = null,
    Func<IQueryable<Basket>, IOrderedQueryable<Basket>>? orderBy = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default)
  {
    var baskets = await _basketRepository.GetAllAsync(
      filter,
      include ?? (query => query
        .Include(b => b.User)
        .Include(b => b.Products).ThenInclude(p => p.Category)
        .Include(b => b.Reviews)
        .Include(b => b.Comments)
        .Include(b => b.SavedBaskets)),
      orderBy,
      enableTracking,
      withDeleted,
      cancellationToken);

    var response = _mapper.EntityToResponseDtoList(baskets);

    for (int i = 0; i < baskets.Count; i++)
    {
      BasketMappingHelper.PopulateSummaryFields(baskets[i], response[i]);
      BasketMappingHelper.PopulateUserInteraction(baskets[i], response[i], userId);
    }

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
    Guid? userId = null,
    Func<IQueryable<Basket>, IQueryable<Basket>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default)
  {
    var basket = await _basketRepository.GetAsync(
      predicate,
      include: query => query
        .Include(b => b.User)
        .Include(b => b.Products).ThenInclude(p => p.Category)
        .Include(b => b.Reviews)
        .Include(b => b.Comments)
        .Include(b => b.SavedBaskets),
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

    BasketMappingHelper.PopulateSummaryFields(basket, response);
    BasketMappingHelper.PopulateUserInteraction(basket, response, userId);

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
    Guid? userId = null,
    Func<IQueryable<Basket>, IQueryable<Basket>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default)
  {
    var basket = await _businessRules.GetBasketIfExistAsync(
      id,
      include: query => query
        .Include(b => b.User)
        .Include(b => b.Products).ThenInclude(p => p.Category)
        .Include(b => b.Reviews)
        .Include(b => b.Comments)
        .Include(b => b.SavedBaskets),
      enableTracking,
      cancellationToken);

    var response = _mapper.EntityToResponseDto(basket);

    BasketMappingHelper.PopulateSummaryFields(basket, response);
    BasketMappingHelper.PopulateUserInteraction(basket, response, userId);

    return new ReturnModel<BasketResponseDto>()
    {
      Success = true,
      Message = $"{id} numaralı sepet başarıyla getirildi.",
      Data = response,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<List<BasketResponseDto>>> GetTopRatedAsync(
    int count,
    Guid? userId = null,
    CancellationToken cancellationToken = default)
  {
    var query = _basketRepository.Query(enableTracking: false)
      .Include(b => b.User)
      .Include(b => b.Products).ThenInclude(p => p.Category)
      .Include(b => b.Reviews)
      .Include(b => b.Comments)
      .Include(b => b.SavedBaskets)
      .OrderByDescending(b => b.Reviews.Average(r => (decimal?)r.StarRating) ?? 0)
      .ThenByDescending(b => b.CreatedDate)
      .Take(count);

    var baskets = await query.ToListAsync(cancellationToken);

    var response = _mapper.EntityToResponseDtoList(baskets);

    for (int i = 0; i < baskets.Count; i++)
    {
      BasketMappingHelper.PopulateSummaryFields(baskets[i], response[i]);
      BasketMappingHelper.PopulateUserInteraction(baskets[i], response[i], userId);
    }

    return new ReturnModel<List<BasketResponseDto>>()
    {
      Success = true,
      Message = $"Öne çıkan {count} sepet başarıyla getirildi.",
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
        FileHelper.ValidateImage(productDto.ImageFile);

        productEntity.ImageUrl = await FileHelper.SaveImageToDisk(
          productDto.ImageFile,
          "products",
          productDto.Name,
          cancellationToken);
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
    var basket = await _businessRules.GetBasketIfExistAsync(
      id,
      include: q => q.Include(b => b.Products),
      enableTracking: true,
      cancellationToken: cancellationToken);

    _businessRules.UserMustOwnBasketOrBeAdmin(basket, userId, userRole);

    var productImages = basket.Products
      .Where(p => !string.IsNullOrEmpty(p.ImageUrl))
      .Select(p => p.ImageUrl)
      .ToList();

    _basketRepository.Delete(basket);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    foreach (var imagePath in productImages)
    {
      FileHelper.DeleteImageFromDisk(imagePath);
    }

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

    var existingBasket = await _businessRules.GetBasketIfExistAsync(
      request.Id,
      include: q => q.Include(b => b.Products),
      enableTracking: true,
      cancellationToken: cancellationToken);

    _businessRules.OnlyUserCanEditBasket(existingBasket, userId);

    await _businessRules.ValidateCategoriesExistAsync(request.Products.Select(p => p.CategoryId).ToList(), cancellationToken);

    _mapper.UpdateEntityFromRequest(request, existingBasket);

    await SyncProductsAsync(existingBasket, request.Products, cancellationToken);

    _basketRepository.Update(existingBasket);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<NoData>()
    {
      Success = true,
      Message = "Sepet başarıyla güncellendi.",
      StatusCode = 200
    };
  }

  private async Task SyncProductsAsync(Basket basket, List<UpdateProductInBasketDto> dtos, CancellationToken cancellationToken)
  {
    var dtoIds = dtos
      .Where(d => d.Id.HasValue && d.Id.Value != Guid.Empty)
      .Select(d => d.Id!.Value)
      .ToHashSet();

    var toDelete = basket.Products
      .Where(p => !dtoIds.Contains(p.Id))
      .ToList();

    foreach (var product in toDelete)
    {
      FileHelper.DeleteImageFromDisk(product.ImageUrl);
      basket.Products.Remove(product);
    }

    foreach (var dto in dtos)
    {
      if (dto.Id.HasValue && dto.Id.Value != Guid.Empty)
      {
        var existing = basket.Products.FirstOrDefault(p => p.Id == dto.Id.Value);

        if (existing != null)
        {
          _mapper.UpdateProductFromDto(dto, existing);

          existing.ImageUrl = await FileHelper.ReplaceImageOnDisk(
            dto.ImageFile,
            existing.ImageUrl,
            "products",
            dto.Name,
            cancellationToken);
        }
      }
      else
      {
        var newProduct = _mapper.UpdateProductInBasketDtoToProduct(dto);

        newProduct.ImageUrl = await FileHelper.ReplaceImageOnDisk(
          dto.ImageFile,
          null,
          "products",
          dto.Name,
          cancellationToken);

        basket.Products.Add(newProduct);
      }
    }
  }
}