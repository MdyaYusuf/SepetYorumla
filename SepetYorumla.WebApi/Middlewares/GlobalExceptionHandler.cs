using FluentValidation;
using Microsoft.AspNetCore.Diagnostics;
using SepetYorumla.Core.Exceptions;
using SepetYorumla.Core.Responses;
using System.Text.Json;

namespace SepetYorumla.WebApi.Middlewares;

public class GlobalExceptionHandler : IExceptionHandler
{
  public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
  {
    var statusCode = exception switch
    {
      NotFoundException => StatusCodes.Status404NotFound,
      AuthorizationException => StatusCodes.Status401Unauthorized,
      BusinessException => StatusCodes.Status400BadRequest,
      ValidationException => StatusCodes.Status400BadRequest,
      _ => StatusCodes.Status500InternalServerError
    };

    var response = new ReturnModel<NoData>
    {
      Success = false,
      Message = statusCode == 500 ? "Sistem kaynaklı bir hata oluştu." : exception.Message,
      StatusCode = statusCode
    };

    if (exception is ValidationException validationException)
    {
      response.Message = "Validasyon hataları oluştu.";
      response.Errors = validationException.Errors.Select(x => x.ErrorMessage).ToList();
    }

    httpContext.Response.ContentType = "application/json";
    httpContext.Response.StatusCode = statusCode;

    await httpContext.Response.WriteAsync(JsonSerializer.Serialize(response), cancellationToken);

    return true;
  }
}
