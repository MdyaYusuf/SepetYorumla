using Microsoft.AspNetCore.Http;
using System.Text.RegularExpressions;

namespace SepetYorumla.Service.Helpers;

public static class FileHelper
{
  public static async Task<string> SaveImageToDisk(IFormFile file, string subFolder, string productName, CancellationToken cancellationToken)
  {
    string wwwrootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
    string targetPath = Path.Combine(wwwrootPath, "images", subFolder);

    if (!Directory.Exists(targetPath))
    {
      Directory.CreateDirectory(targetPath);
    }

    string slug = GetSlug(productName);
    string shortId = Guid.NewGuid().ToString().Substring(0, 8);
    string extension = Path.GetExtension(file.FileName).ToLower();

    string fileName = $"{slug}-{shortId}{extension}";
    string fullPath = Path.Combine(targetPath, fileName);

    using (var stream = new FileStream(fullPath, FileMode.Create))
    {
      await file.CopyToAsync(stream, cancellationToken);
    }

    return $"/images/{subFolder}/{fileName}";
  }

  private static string GetSlug(string name)
  {
    if (string.IsNullOrWhiteSpace(name))
    {
      return "product";
    }

    string slug = name.ToLowerInvariant();

    slug = slug.Replace("ç", "c")
               .Replace("ğ", "g")
               .Replace("ı", "i")
               .Replace("ö", "o")
               .Replace("ş", "s")
               .Replace("ü", "u");

    // Remove anything that isn't a letter, number, or space
    slug = Regex.Replace(slug, @"[^a-z0-9\s-]", "");

    // Convert spaces or hyphens to a single hyphen and trim
    slug = Regex.Replace(slug, @"[\s-]+", "-").Trim('-');

    return slug;
  }
}