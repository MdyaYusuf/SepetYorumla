using SepetYorumla.Core.Exceptions;
using SepetYorumla.DataAccess.Abstracts;
using SepetYorumla.Models.Entities;

namespace SepetYorumla.Service.BusinessRules;

public class CommentBusinessRules(
  ICommentRepository _commentRepository,
  IBasketRepository _basketRepository,
  IUserRepository _userRepository)
{
  public async Task<Comment> GetCommentIfExistAsync(
    int id,
    Func<IQueryable<Comment>, IQueryable<Comment>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default)
  {
    var comment = await _commentRepository.GetByIdAsync(id, include, enableTracking, cancellationToken);

    if (comment == null)
    {
      throw new NotFoundException($"{id} numaralı yorum bulunamadı.");
    }

    return comment;
  }

  public async Task UserMustExistAsync(Guid userId, CancellationToken cancellationToken = default)
  {
    var exists = await _userRepository.AnyAsync(u => u.Id == userId, cancellationToken);

    if (!exists)
    {
      throw new NotFoundException("Kullanıcı bulunamadı.");
    }
  }

  public async Task BasketMustExistAsync(Guid basketId, CancellationToken cancellationToken = default)
  {
    var exists = await _basketRepository.AnyAsync(b => b.Id == basketId, cancellationToken);

    if (!exists)
    {
      throw new NotFoundException("Sepet bulunamadı.");
    }
  }
}