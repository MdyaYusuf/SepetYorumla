namespace SepetYorumla.Models.Dtos.Baskets.Requests;

public class UpdateBasketRequest
{
  public Guid Id { get; set; }
  public string Title { get; set; } = null!;
  public string? Description { get; set; }
  public List<UpdateProductInBasketDto> Products { get; set; } = new();
}
