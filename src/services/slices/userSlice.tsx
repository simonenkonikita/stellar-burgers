import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TRegisterData,
  updateUserApi
} from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { TUser } from '@utils-types';
import { setCookie } from '../../utils/cookie';

export const getUserData = createAsyncThunk('user/getUser', getUserApi);
export const registerUser = createAsyncThunk('user/register', registerUserApi);
export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, password }: Omit<TRegisterData, 'name'>) => {
    const data = await loginUserApi({ email, password });

    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);

    return data.user;
  }
);
export const updateUser = createAsyncThunk('user/update', updateUserApi);
export const logout = createAsyncThunk('user/logout', logoutApi);

export interface UserState {
  isAuthChecked: boolean;
  isLoading: boolean;
  user: TUser | null;
  error: string | null | undefined;
}

const initialState: UserState = {
  isAuthChecked: false,
  isLoading: false,
  user: null,
  error: null
};

export const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {},
  selectors: {
    isAuthCheckedSelector: (state) => state.isAuthChecked,
    getUser: (state) => state.user,
    getUserName: (state) => state.user?.name,
    getError: (state) => state.error,
    getUserLoadingsState: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
        state.isLoading = false;
        state.error = null;
      });

    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.error.message;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload;
        state.isLoading = false;
        state.error = null;
      });
    builder
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
        state.isLoading = false;
        state.error = null;
      });
    builder
      .addCase(getUserData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.error.message;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
        state.isLoading = false;
        state.error = null;
      });
    builder
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthChecked = true;
        state.user = null;
        state.isLoading = false;
        state.error = null;
      });
  }
});

export const {
  isAuthCheckedSelector,
  getUser,
  getUserName,
  getError,
  getUserLoadingsState
} = userSlice.selectors;
