export interface ReviewResponseDto {
  id: string;
  starRating: number;
  isThumbsUp: boolean;
  userId: string;
  username: string;
  basketId: string;
  basketTitle: string;
}

export interface UpsertedReviewResponseDto {
  id: string;
  starRating: number;
  isThumbsUp: boolean;
}

export interface UpsertReviewRequest {
  starRating: number | null;
  isThumbsUp: boolean | null;
  basketId: string;
}