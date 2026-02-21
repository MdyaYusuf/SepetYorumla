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
  public partial CategoryResponseDto EntityToResponseDto(Category entity);
  public partial List<CategoryResponseDto> EntityToResponseDtoList(List<Category> entities);

  public partial Product CreateToEntity(CreateProductRequest request);
  public partial void UpdateEntityFromRequest(UpdateProductRequest request, Product entity);
  [MapProperty("Category.Name", nameof(ProductResponseDto.CategoryName))]
  public partial ProductResponseDto EntityToResponseDto(Product entity);
  public partial List<ProductResponseDto> EntityToResponseDtoList(List<Product> entities);

  public partial Basket CreateToEntity(CreateBasketRequest request);
  public partial void UpdateEntityFromRequest(UpdateBasketRequest request, Basket entity);
  public partial BasketResponseDto EntityToResponseDto(Basket entity);
  public partial List<BasketResponseDto> EntityToResponseDtoList(List<Basket> entities);

  public partial Review CreateToEntity(CreateReviewRequest request);
  public partial void UpdateEntityFromRequest(UpdateReviewRequest request, Review entity);
  public partial ReviewResponseDto EntityToResponseDto(Review entity);
  public partial List<ReviewResponseDto> EntityToResponseDtoList(List<Review> entities);

  public partial Comment CreateToEntity(CreateCommentRequest request);
  public partial void UpdateEntityFromRequest(UpdateCommentRequest request, Comment entity);
  public partial CommentResponseDto EntityToResponseDto(Comment entity);
  public partial List<CommentResponseDto> EntityToResponseDtoList(List<Comment> entities);

  [MapperIgnoreSource(nameof(RegisterUserRequest.Password))]
  [MapperIgnoreTarget(nameof(User.PasswordHash))]
  [MapperIgnoreTarget(nameof(User.PasswordKey))]
  public partial User CreateToEntity(RegisterUserRequest request);
  public partial void UpdateEntityFromRequest(UpdateUserRequest request, User entity);
  public partial UserResponseDto EntityToResponseDto(User entity);
  public partial List<UserResponseDto> EntityToResponseDtoList(List<User> entities);
}
