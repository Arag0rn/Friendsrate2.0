import { createSlice } from '@reduxjs/toolkit';
import { fetchTempUser } from './operation';


export interface NonAuthState {
  isRefreshing: boolean;
  isError: boolean;
  user: {
    username?: string | '';
    status?: string | '';
  } | null;
}

type InitState = NonAuthState;  

const initialState: InitState = {
  user: null,
  isRefreshing: false,
  isError: false,
};

  const NonAuthSlice = createSlice({
    name: 'nonauth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      //fullfilled
      builder.addCase(fetchTempUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isRefreshing = false;
      });
      //rejected
      builder.addCase(fetchTempUser.rejected, (state) => {
        state.isRefreshing = false;
        state.isError = true;
      });
      //pending
      builder.addCase(fetchTempUser.pending, (state) => {
        state.isRefreshing = true;
      });
    }
  });
  export const nonAuthReducer = NonAuthSlice.reducer;