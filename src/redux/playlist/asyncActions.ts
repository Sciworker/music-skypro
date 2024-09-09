import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Track } from './types';

export const fetchTracks = createAsyncThunk<Track[], void>(
  'playlist/fetchTracks',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('https://webdev-music-003b5b991590.herokuapp.com/catalog/track/all/');
      return data.data || [];
    } catch (err) {
      console.error('Ошибка при загрузке данных', err);
      return rejectWithValue('Ошибка при загрузке данных');
    }
  }
);
