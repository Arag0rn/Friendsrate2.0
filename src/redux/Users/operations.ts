import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface GetAllActiveData {
  activeUser: string[];
  }

  export const getAllActive = createAsyncThunk(
    'users/getAllActive',
    async (data: GetAllActiveData, thunkAPI) => {
      console.log(data.activeUser);
      
      try {
        const res = await axios.post('/api/user/get-all', { users: data.activeUser }); 
        console.log(res.data);
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
      console.log(res.data);
      return res.data;
      
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
  
);