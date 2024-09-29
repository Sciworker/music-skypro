import { createAsyncThunk } from '@reduxjs/toolkit';
import { Track } from './types';


export const fetchFavoriteTracks = createAsyncThunk<Track[], void, { rejectValue: string }>(
    'favorites/fetchFavorites',
    async (_, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) throw new Error('Токен авторизации не найден');
  
        const response = await fetch('https://webdev-music-003b5b991590.herokuapp.com/catalog/track/favorite/all/', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) throw new Error('Ошибка при загрузке избранных треков');
  
        const data: { data: Track[] } = await response.json();
        return data.data;
      } catch (error) {
        if (error instanceof Error) {
          return rejectWithValue(error.message);
        }
        return rejectWithValue('Неизвестная ошибка');
      }
    }
  );

export const addTrackToFavorites = createAsyncThunk<Track, Track, { rejectValue: string }>(
  'favorites/addTrackToFavorites',
  async (track: Track, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('Токен не найден');
      }

      const response = await fetch(`https://webdev-music-003b5b991590.herokuapp.com/catalog/track/${track._id}/favorite/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error('Не удалось добавить трек в избранное');
      }

      return track;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue('Unknown error occurred');
      }
    }
  }
);

export const removeTrackFromFavorites = createAsyncThunk<number, number, { rejectValue: string }>(
  'favorites/removeTrackFromFavorites',
  async (trackId: number, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('Токен не найден');
      }

      const response = await fetch(`https://webdev-music-003b5b991590.herokuapp.com/catalog/track/${trackId}/favorite/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error('Не удалось удалить трек из избранного');
      }

      return trackId;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue('Unknown error occurred');
      }
    }
  }
);
