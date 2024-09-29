import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Track, PopupType } from './types';
import { fetchTracks } from './asyncActions';

interface PlayListState {
  tracks: Track[];
  currentTrack: Track | null;
  currentPlaylist: Track[];
  isPlaying: boolean;
  isRepeat: boolean;
  isShuffle: boolean;
  shuffleOrder: Track[];
  shuffleIndex: number;
  currentTime: number;
  error: string | null;
  loading: boolean;
  activeFilter: PopupType | null;
  popups: Record<PopupType, boolean>;
}

const initialState: PlayListState = {
  tracks: [],
  currentTrack: null,
  currentPlaylist: [],
  isPlaying: false,
  isRepeat: false,
  isShuffle: false,
  shuffleOrder: [],
  shuffleIndex: 0,
  currentTime: 0,
  error: null,
  loading: true,
  activeFilter: null,
  popups: {
    author: false,
    release_date: false,
    genre: false,
  },
};

const playListSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    setTracks(state, action: PayloadAction<Track[]>) {
      state.tracks = action.payload;
    },
    setCurrentTrack(state, action: PayloadAction<Track | null>) {
      state.currentTrack = action.payload;
      state.isPlaying = true;
    },
    setCurrentPlaylist(state, action: PayloadAction<Track[]>) {
      state.currentPlaylist = action.payload;
    },
    togglePlayPause(state) {
      state.isPlaying = !state.isPlaying;
    },
    setRepeat(state, action: PayloadAction<boolean>) {
      state.isRepeat = action.payload;
    },
    setShuffle(state, action: PayloadAction<boolean>) {
      state.isShuffle = action.payload;
      if (action.payload) {
        state.shuffleOrder = [...state.currentPlaylist].sort(() => 0.5 - Math.random());
        state.shuffleIndex = 0;
      }
    },
    nextTrack(state) {
      if (state.isShuffle) {
        if (state.shuffleIndex < state.shuffleOrder.length - 1) {
          state.shuffleIndex++;
          state.currentTrack = state.shuffleOrder[state.shuffleIndex];
        } else {
          state.shuffleIndex = 0;
          state.currentTrack = state.shuffleOrder[0];
        }
      } else {
        const currentIndex = state.currentPlaylist.findIndex(t => t._id === state.currentTrack?._id);
        if (currentIndex < state.currentPlaylist.length - 1) {
          state.currentTrack = state.currentPlaylist[currentIndex + 1];
        }
      }
    },
    previousTrack(state) {
      if (state.isShuffle) {
        if (state.shuffleIndex > 0) {
          state.shuffleIndex--;
          state.currentTrack = state.shuffleOrder[state.shuffleIndex];
        }
      } else {
        const currentIndex = state.currentPlaylist.findIndex(t => t._id === state.currentTrack?._id);
        if (currentIndex > 0) {
          state.currentTrack = state.currentPlaylist[currentIndex - 1];
        }
      }
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setActiveFilter(state, action: PayloadAction<PopupType | null>) {
      state.activeFilter = action.payload;
    },
    setPopups(state, action: PayloadAction<{ type: PopupType; value: boolean }>) {
      state.popups[action.payload.type] = action.payload.value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTracks.fulfilled, (state, action) => {
        state.tracks = action.payload;
        state.currentPlaylist = action.payload;
        state.loading = false;
      })
      .addCase(fetchTracks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setTracks,
  setCurrentTrack,
  setCurrentPlaylist,
  togglePlayPause,
  setRepeat,
  setShuffle,
  nextTrack,
  previousTrack,
  setError,
  setLoading,
  setActiveFilter,
  setPopups,
} = playListSlice.actions;

export default playListSlice.reducer;
