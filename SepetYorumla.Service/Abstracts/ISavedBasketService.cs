using SepetYorumla.Core.Responses;
using SepetYorumla.Models.Dtos.Baskets.Responses;
using SepetYorumla.Models.Dtos.SavedBaskets.Requests;

namespace SepetYorumla.Service.Abstracts;

public interface ISavedBasketService
{
  Task<ReturnModel<NoData>> ToggleSaveAsync(CreateSavedBasketRequest request, Guid userId, CancellationToken cancellationToken);
  Task<ReturnModel<List<BasketResponseDto>>> GetSavedBasketsAsync(Guid userId, CancellationToken cancellationToken);
}
