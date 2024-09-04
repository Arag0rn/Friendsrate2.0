import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// interface UnRegisterData {
//     username?: string;
//     status?: string;

//   };
  
  export const fetchTempUser = createAsyncThunk('tempUser/fetchTempUser', async (userName: string) => {
    const response = await axios.post('/api/unreg/singup', { userName });
    return response.data;
  });