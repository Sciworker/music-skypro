import { RootState } from '../../redux/store';

export const selectTracks = (state: RootState) => state.playlist.tracks;
export const selectCurrentTrack = (state: RootState) => state.playlist.currentTrack;
export const selectCurrentPlaylist = (state: RootState) => state.playlist.currentPlaylist;
export const selectIsPlaying = (state: RootState) => state.playlist.isPlaying;
export const selectIsRepeat = (state: RootState) => state.playlist.isRepeat;
export const selectIsShuffle = (state: RootState) => state.playlist.isShuffle;
export const selectCurrentTime = (state: RootState) => state.playlist.currentTime;
export const selectError = (state: RootState) => state.playlist.error;
export const selectLoading = (state: RootState) => state.playlist.loading;
export const selectActiveFilter = (state: RootState) => state.playlist.activeFilter;
export const selectPopups = (state: RootState) => state.playlist.popups;
export const selectFavoriteTracks = (state: RootState) => state.favorites?.favoriteTracks || [];
export const selectFavoritesLoading = (state: RootState) => state.favorites?.loading || false;
export const selectFavoritesError = (state: RootState) => state.favorites?.error || null;
