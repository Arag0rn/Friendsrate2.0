import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface GetAllActiveData {
  activeUser: string[];
  }

  export const getAllActive = createAsyncThunk(
    'users/getAllActive',
    async (data: GetAllActiveData, thunkAPI) => {
      
      try {
        const res = await axios.post('/api/user/get-all', { users: data.activeUser }); 
        return res.data;
        
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
    
);


export const getAllWithRate = createAsyncThunk(
  'users/getAllWithRate',
  async (_, thunkAPI) => {
 
    try {
      const res = await axios.post('/api/user/get-all-rate'); 
      return res.data;
      
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
  
);