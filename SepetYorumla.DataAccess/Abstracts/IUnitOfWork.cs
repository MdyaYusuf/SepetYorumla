namespace SepetYorumla.DataAccess.Abstracts;

public interface IUnitOfWork : IAsyncDisposable
{
  Task<int> SaveChangesAsync();
}
