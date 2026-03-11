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
  id: string;
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