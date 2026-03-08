import { requests } from './axiosInstance';
import type { UpsertReviewRequest, UpsertedReviewResponseDto, ReviewResponseDto } from '../models/Review';

export const ReviewService = {
  upsert: (request: UpsertReviewRequest) =>
    requests.post<UpsertedReviewResponseDto>("Reviews/upsert", request),

  getByBasketId: (basketId: string) =>
    requests.get<ReviewResponseDto[]>(`Reviews/basket/${basketId}`),

  delete: (id: string) =>
    requests.delete<void>(`Reviews/${id}`),
};