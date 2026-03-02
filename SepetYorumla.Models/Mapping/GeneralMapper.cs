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
using SepetYorumla.Models.Dtos.Roles.Requests;
using SepetYorumla.Models.Dtos.Roles.Responses;
using SepetYorumla.Models.Dtos.Users.Requests;
using SepetYorumla.Models.Dtos.Users.Responses;
using SepetYorumla.Models.Entities;

namespace SepetYorumla.Models.Mapping;

[Mapper(RequiredMappingStrategy = RequiredMappingStrategy.None)]
public partial class GeneralMapper
{
  // Category
  public partial Category CreateToEntity(CreateCategoryRequest request);
  public partial void UpdateEntityFromRequest(UpdateCategoryRequest request, Category entity);
  public partial CategoryResponseDto EntityToResponseDto(Category entity);
  public partial List<CategoryResponseDto> EntityToResponseDtoList(List<Category> entities);

  // Role
  public partial Role CreateToEntity(CreateRoleRequest request);
  public partial void UpdateEntityFromRequest(UpdateRoleRequest request, Role entity);
  public partial RoleResponseDto EntityToResponseDto(Role entity);
  public partial List<RoleResponseDto> EntityToResponseDtoList(List<Role> entities);

  // Product
  public partial Product CreateToEntity(CreateProductRequest request);
  public partial void UpdateEntityFromRequest(UpdateProductRequest request, Product entity);
  public partial Product ProductDtoToEntity(CreateProductInBasketDto dto);
  [MapProperty("Basket.Title", nameof(ProductResponseDto.BasketTitle))]
  [MapProperty("Category.Name", nameof(ProductResponseDto.CategoryName))]
  public partial ProductResponseDto EntityToResponseDto(Product entity);
  public partial List<ProductResponseDto> EntityToResponseDtoList(List<Product> entities);

  // Basket
  public partial Basket CreateToEntity(CreateBasketRequest request);
  public partial void UpdateEntityFromRequest(UpdateBasketRequest request, Basket entity);
  [MapProperty("User.Username", nameof(BasketResponseDto.Username))]
  public partial BasketResponseDto EntityToResponseDto(Basket entity);
  public partial List<BasketResponseDto> EntityToResponseDtoList(List<Basket> entities);

  // Review
  public partial Review CreateToEntity(CreateReviewRequest request);
  public partial void UpdateEntityFromRequest(UpdateReviewRequest request, Review entity);
  [MapProperty("User.Username", nameof(ReviewResponseDto.Username))]
  [MapProperty("Basket.Title", nameof(ReviewResponseDto.BasketTitle))]
  public partial ReviewResponseDto EntityToResponseDto(Review entity);
  public partial List<ReviewResponseDto> EntityToResponseDtoList(List<Review> entities);

  // Comment
  public partial Comment CreateToEntity(CreateCommentRequest request);
  public partial void UpdateEntityFromRequest(UpdateCommentRequest request, Comment entity);
  [MapProperty("User.Username", nameof(CommentResponseDto.Username))]
  [MapProperty("Basket.Title", nameof(CommentResponseDto.BasketTitle))]
  public partial CommentResponseDto EntityToResponseDto(Comment entity);
  public partial List<CommentResponseDto> EntityToResponseDtoList(List<Comment> entities);

  // User
  [MapperIgnoreSource(nameof(RegisterUserRequest.Password))]
  [MapperIgnoreTarget(nameof(User.PasswordHash))]
  [MapperIgnoreTarget(nameof(User.PasswordKey))]
  public partial User CreateToEntity(RegisterUserRequest request);
  public partial void UpdateEntityFromRequest(UpdateUserRequest request, User entity);
  [MapProperty("Role.Name", nameof(UserResponseDto.RoleName))]
  public partial UserResponseDto EntityToResponseDto(User entity);
  public partial List<UserResponseDto> EntityToResponseDtoList(List<User> entities);
}
