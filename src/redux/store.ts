import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import playlistReducer from './playlist/slice';


export const store = configureStore({
  reducer: {
    playlist: playlistReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
