using Microsoft.EntityFrameworkCore;
using SepetYorumla.Core.Responses;
using SepetYorumla.DataAccess.Abstracts;
using SepetYorumla.Models.Dtos.Baskets.Responses;
using SepetYorumla.Models.Dtos.SavedBaskets.Requests;
using SepetYorumla.Models.Mapping;
using SepetYorumla.Service.Abstracts;
using SepetYorumla.Service.BusinessRules;
using SepetYorumla.Service.Helpers;

namespace SepetYorumla.Service.Concretes;

public class SavedBasketService(
    ISavedBasketRepository _savedBasketRepository,
    IBasketRepository _basketRepository,
    SavedBasketBusinessRules _businessRules,
    GeneralMapper _mapper,
    IUnitOfWork _unitOfWork) : ISavedBasketService
{
  public async Task<ReturnModel<NoData>> ToggleSaveAsync(CreateSavedBasketRequest request, Guid userId, CancellationToken cancellationToken)
  {
    await _businessRules.BasketMustExist(request.BasketId, cancellationToken);

    var existingSave = await _savedBasketRepository.GetAsync(
      predicate: sb => sb.BasketId == request.BasketId && sb.UserId == userId,
      enableTracking: true,
      cancellationToken: cancellationToken);

    if (existingSave != null)
    {
      _savedBasketRepository.Delete(existingSave);
      await _unitOfWork.SaveChangesAsync(cancellationToken);

      return new ReturnModel<NoData>()
      {
        Success = true,
        Message = "Sepet kaydedilenlerden kaldırıldı.",
        Data = null,
        StatusCode = 200
      };
    }

    var savedBasket = _mapper.CreateToEntity(request, userId);

    await _savedBasketRepository.AddAsync(savedBasket, cancellationToken);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<NoData>()
    {
      Success = true,
      Message = "Sepet başarıyla kaydedildi.",
      Data = null,
      StatusCode = 201
    };
  }

  public async Task<ReturnModel<List<BasketResponseDto>>> GetSavedBasketsAsync(Guid userId, CancellationToken cancellationToken)
  {
    var baskets = await _basketRepository.GetAllAsync(
      filter: b => b.SavedBaskets.Any(sb => sb.UserId == userId),
      include: query => query
        .Include(b => b.User)
        .Include(b => b.Products).ThenInclude(p => p.Category)
        .Include(b => b.Reviews)
        .Include(b => b.Comments)
        .Include(b => b.SavedBaskets),
      cancellationToken: cancellationToken);

    var response = _mapper.EntityToResponseDtoList(baskets);

    for (int i = 0; i < baskets.Count; i++)
    {
      BasketMappingHelper.PopulateSummaryFields(baskets[i], response[i]);
      BasketMappingHelper.PopulateUserInteraction(baskets[i], response[i], userId);
    }

    return new ReturnModel<List<BasketResponseDto>>()
    {
      Success = true,
      Message = "Kaydedilen sepetler başarıyla getirildi.",
      Data = response,
      StatusCode = 200
    };
  }
}
