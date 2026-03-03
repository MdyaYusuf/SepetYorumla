using SepetYorumla.Core.Exceptions;
using SepetYorumla.DataAccess.Abstracts;
using SepetYorumla.Models.Entities;

namespace SepetYorumla.Service.BusinessRules;

public class CommentBusinessRules(
  ICommentRepository _commentRepository,
  IBasketRepository _basketRepository)
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

  public async Task BasketMustExistAsync(Guid basketId, CancellationToken cancellationToken = default)
  {
    var exists = await _basketRepository.AnyAsync(b => b.Id == basketId, cancellationToken);

    if (!exists)
    {
      throw new NotFoundException("Sepet bulunamadı.");
    }
  }

  public void UserMustOwnCommentOrBeAdmin(Comment comment, Guid userId, string userRole)
  {
    if (comment.UserId != userId && userRole != "Admin")
    {
      throw new ForbiddenException("Bu işlem için yetkiniz bulunmamaktadır.");
    }
  }

  public void OnlyUserCanEditComment(Comment comment, Guid userId)
  {
    if (comment.UserId != userId)
    {
      throw new ForbiddenException("Yorumu sadece sahibi düzenleyebilir.");
    }
  }
}