import { createSlice } from '@reduxjs/toolkit';
import { fetchFavoriteTracks, addTrackToFavorites, removeTrackFromFavorites } from './asyncActions';
import { Track } from './types';

interface FavoritesState {
  favoriteTracks: Track[];
  loading: boolean;
  error: string | null;
}

const initialState: FavoritesState = {
  favoriteTracks: [],
  loading: false,
  error: null,
};

const loadFavoritesFromStorage = (): Track[] => {
  if (typeof window !== 'undefined') {
    const savedFavorites = localStorage.getItem('favoriteTracks');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  }
  return [];
};

const saveFavoritesToStorage = (favorites: Track[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('favoriteTracks', JSON.stringify(favorites));
  }
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    ...initialState,
    favoriteTracks: loadFavoritesFromStorage(),
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoriteTracks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavoriteTracks.fulfilled, (state, action) => {
        state.loading = false;
        state.favoriteTracks = action.payload;
        saveFavoritesToStorage(state.favoriteTracks);
      })
      .addCase(fetchFavoriteTracks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addTrackToFavorites.fulfilled, (state, action) => {
        const newTrack = action.payload;
        if (!state.favoriteTracks.find((track) => track._id === newTrack._id)) {
          state.favoriteTracks.push(newTrack);
          saveFavoritesToStorage(state.favoriteTracks);
        }
      })
      .addCase(removeTrackFromFavorites.fulfilled, (state, action) => {
        const trackId = action.payload;
        state.favoriteTracks = state.favoriteTracks.filter((track) => track._id !== trackId);
        saveFavoritesToStorage(state.favoriteTracks);
      });
  },
});

export default favoritesSlice.reducer;
