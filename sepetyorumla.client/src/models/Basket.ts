export interface BasketResponseDto {
  id: string;
  title: string;
  description?: string;
  userId: string;
  username: string;
  userProfileImageUrl?: string;
  products: ProductPreviewDto[];
  createdDate: string;
  averageRating: number;
  totalThumbsUp: number;
  totalThumbsDown: number;
  totalComments: number;
  totalRatingsCount: number;
  userThumbsUp: boolean | null;
  userStarRating: number | null;
  isSaved: boolean;
}

export interface ProductPreviewDto {
  id: string;
  categoryId: number;
  name: string;
  imageUrl?: string;
  price: number;
  categoryName: string;
  brand?: string;
  model?: string;
  storeName?: string;
  description?: string;
}

export interface CreatedBasketResponseDto {
  id: string;
  title: string;
}