import axiosInstance from './axiosInstance';
import type {
  CommentResponseDto,
  CreateCommentRequest,
  UpdateCommentRequest,
  CreatedCommentResponseDto
} from '../models/Comment';
import type { ApiResponse } from '../models/ApiResponse';

export const CommentService = {
  getByBasketId: (basketId: string) =>
    axiosInstance.get<ApiResponse<CommentResponseDto[]>>(`/comments/basket/${basketId}`),

  add: (request: CreateCommentRequest) =>
    axiosInstance.post<ApiResponse<CreatedCommentResponseDto>>('/comments', request),

  update: (request: UpdateCommentRequest) =>
    axiosInstance.put<ApiResponse<null>>('/comments', request),

  delete: (id: number) =>
    axiosInstance.delete<ApiResponse<null>>(`/comments/${id}`)
};