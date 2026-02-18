using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SepetYorumla.DataAccess.Abstracts;
using SepetYorumla.DataAccess.Concretes;
using SepetYorumla.DataAccess.Contexts;

namespace SepetYorumla.DataAccess.Extensions;

public static class DataAccessDependencies
{
  public static IServiceCollection AddDataAccessDependencies(this IServiceCollection services, IConfiguration configuration)
  {
    services.AddDbContext<BaseDbContext>(options => options.UseSqlServer(configuration.GetConnectionString("SqlConnection")));

    services.AddScoped<ICategoryRepository, EfCategoryRepository>();

    return services;
  }
}
