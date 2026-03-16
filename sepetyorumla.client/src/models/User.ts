import type { BasketResponseDto } from "./Basket";

export interface User {
  id: string;
  username: string;
  email: string;
  profileImageUrl?: string;
  bio?: string;
  roleName: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface CreatedUserResponseDto {
  id: string;
  username: string;
}

export interface UpdateUserRequest {
  username: string;
  email: string;
  bio?: string;
  imageFile?: File;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface UserActivityStats {
  totalBaskets: number;
  totalBasketsLiked: number;
  totalSavedBaskets: number;
  totalCommentsMade: number;
  createdDate: string;
}

export interface ProfileResponse {
  id: string;
  username: string;
  profileImageUrl: string | null;
  bio: string | null;
  createdDate: string;
  followersCount: number;
  followingCount: number;
  totalCommentsReceived: number;
  totalLikesReceived: number;
  isFollowing: boolean;
  topBaskets: BasketResponseDto[];
}