import { createSlice } from '@reduxjs/toolkit';
import {
  deleteUser,
  logIn,
  logOut,
  refreshUser,
  register,
  updateUserData,
  forgotPassword,
  resetPassword,
  setUserRate,
  updateImageProfile,
  telegramAuthorized,
}
  from './operations';



export interface AuthState {
  isLoggedIn: boolean;
  isRefreshing: boolean;
  isError: boolean;
  token: string | null;
  data: null;
  isRehydrated: boolean;  
  user: {
    username?: string | '';
    birthday?: string | '';
    gender?: string | '';
    email: string | '';
    password: string | '';
    avatarURL?: string | '';
    verify?: boolean;
    about?: string | '';
    language?: string | '';
    _id?: string | '';
    rate?: number | null;
    ratingCount?: number | null;
  } | null;
}

type InitState = AuthState;  

const initialState: InitState = {
  user: null,
  token: null,
  data: null,
  isLoggedIn: false,
  isRefreshing: false,
  isError: false,
  isRehydrated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    google: (state, action) => {
      state.token = action.payload;
      state.isLoggedIn = true;
      state.isRefreshing = false;
    },
  },
  extraReducers: (builder) => {
    // fullfilled
    builder.addCase(register.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.isRefreshing = false;
    });
    builder.addCase(telegramAuthorized.fulfilled, (state, action) => {
      state.token = action.payload.token;  
      state.isLoggedIn = true;
      state.isRefreshing = false;

    })
    builder.addCase(refreshUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isRefreshing = false;
    });
    builder.addCase(logIn.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.isRefreshing = false;
      state.isError = false;
    });
    builder.addCase(updateUserData.fulfilled, (state, action) => {
      state.user = { ...state.user, ...action.payload };
      state.token = action.payload.token;
      state.isRefreshing = false;
      state.isError = false;
    });
    builder.addCase(logOut.fulfilled, (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      state.isRefreshing = false;
      state.isError = false;
    });
    builder.addCase(deleteUser.fulfilled, (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      state.isRefreshing = false;
      state.isError = false;
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      if (state.user?.email !== undefined) {
        state.user.email = action.payload.email;
      }
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      if (state.user?.password !== undefined) {
        state.user.password = action.payload.password;
      }
      state.token = action.payload.token;
    });
    builder.addCase(setUserRate.fulfilled, (state, action) => {
      if (state.user?.rate !== undefined) {
        state.user.rate = action.payload.rate;
      }
    });
    builder.addCase(updateImageProfile.fulfilled, (state, action) => {
      if (state.user?.avatarURL !== undefined) {
        state.user.avatarURL = action.payload.avatarURL as string;
      }
    });

    // rejected
    builder.addCase(refreshUser.rejected, (state) => {

      state.isRefreshing = false;

    });
    builder.addCase(register.rejected, (state) => {
      state.isRefreshing = false;
      state.isError = true;
    });
    builder.addCase(telegramAuthorized.rejected, (state) => {
      state.isError = true;
    });

    // pending
    builder.addCase(refreshUser.pending, (state) => {
      state.isRefreshing = true; 
    });
    builder.addCase(register.pending, (state) => {
      state.isRefreshing = true;
    });

  },
});

export const authReducer = authSlice.reducer;
export const { google } = authSlice.actions;
