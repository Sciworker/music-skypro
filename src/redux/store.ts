import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import playlistReducer from './playlist/slice';
import authReducer from './auth/slice';
import favoriteReducer from './favorites/slice';
import selectionsReducer from './selections/slice';

export const store = configureStore({
  reducer: {
    playlist: playlistReducer,
    auth: authReducer,
    favorites: favoriteReducer,
    selections: selectionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
