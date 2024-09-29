import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllSelections = createAsyncThunk(
  'selections/fetchAllSelections',
  async () => {
    const response = await axios.get('https://webdev-music-003b5b991590.herokuapp.com/catalog/selection/all');
    return response.data.data;
  }
);

export const fetchSelectionById = createAsyncThunk(
  'selections/fetchSelectionById',
  async (id: number) => {
    const response = await axios.get(`https://webdev-music-003b5b991590.herokuapp.com/catalog/selection/${id}`);
    return response.data;
  }
);