using Microsoft.Extensions.DependencyInjection;
using SepetYorumla.Models.Mapping;

namespace SepetYorumla.Service.Extensions;

public static class ServiceDependencies
{
  public static IServiceCollection AddServiceDependencies(this IServiceCollection services)
  {

    services.AddSingleton<GeneralMapper>();

    return services;
  }
}
