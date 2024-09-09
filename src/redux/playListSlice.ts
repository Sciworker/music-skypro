import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Track } from '../types/types';

interface PlaylistState {
  tracks: Track[];
  currentPlaylist: Track[];
  currentTrack: Track | null;
}

const initialState: PlaylistState = {
  tracks: [],
  currentPlaylist: [],
  currentTrack: null,
};

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    setTracks(state, action: PayloadAction<Track[]>) {
      state.tracks = action.payload;
    },
    setCurrentPlaylist(state, action: PayloadAction<Track[]>) {
      state.currentPlaylist = action.payload;
    },
    setCurrentTrack(state, action: PayloadAction<Track | null>) {
      state.currentTrack = action.payload;
    },
  },
});

export const { setTracks, setCurrentTrack, setCurrentPlaylist } = playlistSlice.actions;
export default playlistSlice.reducer;
