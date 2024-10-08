import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthState } from './slice';

// axios.defaults.baseURL = 'http://localhost:3000';

axios.defaults.baseURL = 'https://api.friendsrate.org/';


const setAuthHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};


const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

interface RegisterData {
  username?: string;
  birthday?: string;
  gender?: string;
  email: string;
  password: string;
  avatar?: string;
  verify?:boolean;
};

interface NewPassword {
  password: string,
  confirmPassword: string,
  token: string,
}

interface UpdatedData {
  username?: string;
  birthday?: string;
  gender?: string;
  email: string;
  avatar?: string;
  verify?:boolean;
  password?: string | '';
  about?: string | '';
  language?: string | '';
};

interface RateData {
  rate?: number;
  username?: string;
};



export const register = createAsyncThunk(
  'auth/register',
  async (newUser: RegisterData, thunkAPI) => {
    try {
      const res = await axios.post('api/user/register', newUser);
      setAuthHeader(res.data.token);
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/login',
  async (credentials:RegisterData, thunkAPI) => {
   
    try {
      const res = await axios.post('api/user/login', credentials);
      setAuthHeader(res.data.token);
      const resUser = await axios.get('/api/user/current');

      return { user: resUser.data, token: res.data.token };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as { auth: AuthState };
    const persistedToken = state.auth.token;
    
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    if (!persistedToken) {
     
      return thunkAPI.rejectWithValue('No token available');
    }


    try {
      setAuthHeader(persistedToken);
      const res = await axios.get('api/user/current');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateUserData = createAsyncThunk(
  'auth/updateUserData',
  async (userData: UpdatedData, thunkAPI) => {
    try {
      const res = await axios.patch('/api/user/update', userData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logOut = createAsyncThunk(
  '/auth/signout',
  async (_, thunkAPI) => {
    try {
      await axios.post('/api/user/logout');
      clearAuthHeader();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'auth/delete',
  async (_, thunkAPI) => {
    try {
      const response = await axios.delete(`/api/user/delete`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'auth/forgot-password',
  async (email: string, thunkAPI) => {
    try {
      const res = await axios.post('/api/user/forgot-password', { email });

      return { email, data: res.data, };
    }
    catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
});

export const resetPassword = createAsyncThunk(
  'auth/restore-password',
  async (newPassword: NewPassword, thunkAPI) => {
    const { password, confirmPassword, token } = newPassword;
    try {
      await axios.post(`/api/user/reset-password/${token}`, { password, confirmPassword });

      return { password, newPassword, token }
    }
    catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
});


export const setUserRate = createAsyncThunk(
  'auth/setUserRate',
  async (userData: RateData, thunkAPI) => {
    try {
      const res = await axios.patch('/api/user/set-rate', userData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateImageProfile = createAsyncThunk('auth/update-avatar',
  async (avatarURL: string | File) => {

    const res = await axios.patch('/api/user/avatars', { avatarURL }, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });

    return res.data;
});




export const telegramAuthorized = createAsyncThunk(
  'auth/telegram',
  async (userData: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/user/telegram`, (userData))
   
      
      return response.data; 
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);