
import axios from 'axios';
import { Track } from '../types/types';

export const fetchTracks = async (): Promise<Track[]> => {
  try {
    const { data } = await axios.get('https://webdev-music-003b5b991590.herokuapp.com/catalog/track/all/');
    return data.data || [];
  } catch (err) {
    console.error('Ошибка при загрузке данных', err);
    throw new Error('Ошибка при загрузке данных');
  }
};
