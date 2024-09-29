import { RootState } from '../store';

export const selectFavoriteTracks = (state: RootState) => state.favorites.favoriteTracks || [];
export const selectFavoritesLoading = (state: RootState) => state.favorites.loading;
export const selectFavoritesError = (state: RootState) => state.favorites.error;
