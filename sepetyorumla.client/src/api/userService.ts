import { requests } from './axiosInstance';
import type { UpdateUserRequest, ChangePasswordRequest, UserActivityStats, ProfileResponse } from '../models/User';

export const UserService = {

  update: async (request: UpdateUserRequest) => {
    const formData = new FormData();
    formData.append('Username', request.username);
    formData.append('Email', request.email);

    if (request.bio) {
      formData.append('Bio', request.bio);
    }

    if (request.imageFile) {
      formData.append('ImageFile', request.imageFile);
    }

    return requests.put<null>('Users', formData);
  },

  changePassword: async (request: ChangePasswordRequest) => {

    return requests.post<null>('Users/change-password', request);
  },

  getStats: async (userId: string) => {

    return requests.get<UserActivityStats>(`Users/${userId}/stats`);
  },

  getByUsername: async (username: string) => {

    return requests.get<ProfileResponse>(`Users/profile/${username}`);
  },
};