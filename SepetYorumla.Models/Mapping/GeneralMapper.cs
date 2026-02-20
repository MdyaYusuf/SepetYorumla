using Riok.Mapperly.Abstractions;
using SepetYorumla.Models.Dtos.Baskets.Requests;
using SepetYorumla.Models.Dtos.Baskets.Responses;
using SepetYorumla.Models.Dtos.Categories.Requests;
using SepetYorumla.Models.Dtos.Categories.Responses;
using SepetYorumla.Models.Dtos.Comments.Requests;
using SepetYorumla.Models.Dtos.Comments.Responses;
using SepetYorumla.Models.Dtos.Products.Requests;
using SepetYorumla.Models.Dtos.Products.Responses;
using SepetYorumla.Models.Dtos.Reviews.Requests;
using SepetYorumla.Models.Dtos.Reviews.Responses;
using SepetYorumla.Models.Dtos.Users.Requests;
using SepetYorumla.Models.Dtos.Users.Responses;
using SepetYorumla.Models.Entities;

namespace SepetYorumla.Models.Mapping;

[Mapper(RequiredMappingStrategy = RequiredMappingStrategy.None)]
public partial class GeneralMapper
{
  public partial Category CreateToEntity(CreateCategoryRequest request);
  public partial void UpdateEntityFromRequest(UpdateCategoryRequest request, Category entity);
  public partial CategoryResponseDto EntityToResponse(Category entity);

  public partial Product CreateToEntity(CreateProductRequest request);
  public partial void UpdateEntityFromRequest(UpdateProductRequest request, Product entity);
  public partial ProductResponseDto EntityToResponse(Product entity);

  public partial Basket CreateToEntity(CreateBasketRequest request);
  public partial void UpdateEntityFromRequest(UpdateBasketRequest request, Basket entity);
  public partial BasketResponseDto EntityToResponse(Basket entity);

  public partial Review CreateToEntity(CreateReviewRequest request);
  public partial void UpdateEntityFromRequest(UpdateReviewRequest request, Review entity);
  public partial ReviewResponseDto EntityToResponse(Review entity);

  public partial Comment CreateToEntity(CreateCommentRequest request);
  public partial void UpdateEntityFromRequest(UpdateCommentRequest request, Comment entity);
  public partial CommentResponseDto EntityToResponse(Comment entity);

  public partial UserResponseDto EntityToResponse(User entity);
  public partial void UpdateEntityFromRequest(UpdateUserRequest request, User entity);
}
