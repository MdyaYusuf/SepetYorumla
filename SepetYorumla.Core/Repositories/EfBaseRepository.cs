using Microsoft.EntityFrameworkCore;
using SepetYorumla.Core.Entities;
using System.Linq.Expressions;

namespace SepetYorumla.Core.Repositories;

public class EfBaseRepository<TContext, TEntity, TId> : IRepository<TEntity, TId>
  where TEntity : Entity<TId>, new()
  where TContext : DbContext
  where TId : notnull
{
  protected TContext _context { get; }

  public EfBaseRepository(TContext context)
  {
    _context = context;
  }

  public async Task<List<TEntity>> GetAllAsync(bool enableTracking = false, bool withDeleted = false, Func<IQueryable<TEntity>, IQueryable<TEntity>>? include = null, Expression<Func<TEntity, bool>>? filter = null, Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>>? orderBy = null, CancellationToken cancellationToken = default)
  {
    IQueryable<TEntity> query = _context.Set<TEntity>();

    if (!enableTracking)
    {
      query = query.AsNoTracking();
    }

    if (withDeleted)
    {
      query = query.IgnoreQueryFilters();
    }

    if (include != null)
    {
      query = include(query);
    }

    if (filter != null)
    {
      query = query.Where(filter);
    }

    if (orderBy != null)
    {
      query = orderBy(query);
    }

    return await query.ToListAsync(cancellationToken);
  }

  public async Task<TEntity?> GetByIdAsync(TId id)
  {
    return await _context.Set<TEntity>().FindAsync(id);
  }

  public async Task<TEntity> AddAsync(TEntity entity)
  {
    entity.CreatedDate = DateTime.Now;
    await _context.Set<TEntity>().AddAsync(entity);

    return entity;
  }

  public void Delete(TEntity entity)
  {
    _context.Set<TEntity>().Remove(entity);
  }

  public void Update(TEntity entity)
  {
    entity.UpdatedDate = DateTime.Now;
    _context.Set<TEntity>().Update(entity);
  }
}
