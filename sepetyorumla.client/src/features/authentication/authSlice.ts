import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { User } from '../../models/User';
import type { TokenResponseDto } from '../../models/Token';
import type { ApiResponse } from '../../models/ApiResponse';

export const initializeAuth = createAsyncThunk(
  'auth/initialize',
  async (_, { dispatch }) => {
    try {
      const response = await axios.post<ApiResponse<TokenResponseDto>>(
        'http://localhost:5222/api/Authentication/refresh-token',
        {},
        { withCredentials: true }
      );
      dispatch(setCredentials(response.data.data));
    } catch (error) {
      dispatch(setInitialized());
    }
  }
);

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isInitialized: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<TokenResponseDto>) => {
      state.user = action.payload.user;
      state.token = action.payload.accessToken;
      state.isAuthenticated = true;
      state.isInitialized = true;
    },

    updateUser: (state, action: PayloadAction<Partial<User>>) => {

      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isInitialized = true;
    },
    setInitialized: (state) => {
      state.isInitialized = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeAuth.fulfilled, (state) => { state.isInitialized = true; })
      .addCase(initializeAuth.rejected, (state) => { state.isInitialized = true; });
  }
});

export const { setCredentials, logout, setInitialized, updateUser } = authSlice.actions;
export default authSlice.reducer;