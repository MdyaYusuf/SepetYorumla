using SepetYorumla.Core.Exceptions;
using SepetYorumla.DataAccess.Abstracts;

namespace SepetYorumla.Service.BusinessRules;

public class SavedBasketBusinessRules(IBasketRepository _basketRepository)
{
  public async Task BasketMustExist(Guid basketId, CancellationToken cancellationToken)
  {
    var exists = await _basketRepository.AnyAsync(b => b.Id == basketId, cancellationToken);

    if (!exists)
    {
      throw new NotFoundException("Kaydedilmek istenen sepet bulunamadı.");
    }
  }
}
