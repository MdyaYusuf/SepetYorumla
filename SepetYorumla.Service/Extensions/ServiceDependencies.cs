using Microsoft.Extensions.DependencyInjection;
using SepetYorumla.Models.Mapping;
using SepetYorumla.Service.Abstracts;
using SepetYorumla.Service.BusinessRules;
using SepetYorumla.Service.Concretes;

namespace SepetYorumla.Service.Extensions;

public static class ServiceDependencies
{
  public static IServiceCollection AddServiceDependencies(this IServiceCollection services)
  {

    services.AddSingleton<GeneralMapper>();

    services.AddScoped<CategoryBusinessRules>();
    services.AddScoped<ProductBusinessRules>();

    services.AddScoped<ICategoryService, CategoryService>();
    services.AddScoped<IProductService, ProductService>();

    return services;
  }
}
