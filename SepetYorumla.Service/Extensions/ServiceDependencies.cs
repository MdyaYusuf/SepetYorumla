using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using SepetYorumla.Models.Mapping;
using SepetYorumla.Service.Abstracts;
using SepetYorumla.Service.BusinessRules;
using SepetYorumla.Service.Concretes;
using System.Reflection;

namespace SepetYorumla.Service.Extensions;

public static class ServiceDependencies
{
  public static IServiceCollection AddServiceDependencies(this IServiceCollection services)
  {

    services.AddSingleton<GeneralMapper>();

    services.AddScoped<CategoryBusinessRules>();
    services.AddScoped<ProductBusinessRules>();
    services.AddScoped<BasketBusinessRules>();
    services.AddScoped<CommentBusinessRules>();
    services.AddScoped<ReviewBusinessRules>();
    services.AddScoped<UserBusinessRules>();
    services.AddScoped<AuthenticationBusinessRules>();
    services.AddScoped<RoleBusinessRules>();

    services.AddScoped<ICategoryService, CategoryService>();
    services.AddScoped<IProductService, ProductService>();
    services.AddScoped<IBasketService, BasketService>();
    services.AddScoped<ICommentService, CommentService>();
    services.AddScoped<IReviewService, ReviewService>();
    services.AddScoped<IUserService, UserService>();
    services.AddScoped<IAuthenticationService, AuthenticationService>();
    services.AddScoped<IRoleService, RoleService>();

    services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());

    return services;
  }
}
