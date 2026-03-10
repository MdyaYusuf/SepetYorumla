export interface CommentResponseDto {
  id: number;
  text: string;
  userId: string;
  username: string;
  userProfileImageUrl?: string;
  basketId: string;
  basketTitle: string;
  createdDate: string;
}

export interface CreateCommentRequest {
  text: string;
  basketId: string;
}

export interface UpdateCommentRequest {
  id: number;
  text: string;
}

export interface CreatedCommentResponseDto {
  id: number;
}