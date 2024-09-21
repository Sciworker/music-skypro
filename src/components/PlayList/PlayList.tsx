'use client'; 
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTracks } from '../../redux/playlist/asyncActions';
import { fetchFavoriteTracks } from '../../redux/favorites/asyncActions';
import { 
  setCurrentTrack, 
  togglePlayPause, 
  nextTrack, 
  previousTrack, 
  setRepeat, 
  setShuffle,
  setPopups,
  setActiveFilter,
  setCurrentPlaylist
} from '../../redux/playlist/slice';  
import {
  selectCurrentTrack,
  selectCurrentPlaylist,
  selectIsPlaying,
  selectIsRepeat,
  selectIsShuffle,
  selectLoading,
  selectError,
  selectActiveFilter,
  selectPopups,
} from '../../redux/playlist/selectors';
import { selectFavoriteTracks, selectFavoritesLoading, selectFavoritesError } from '@/redux/favorites/selectors'; 
import { store } from '@/redux/store';
import PlayListFilters from '../PlayListFilters/PlayListFilters';
import TrackList from '../TrackList/TrackList';
import ControlBar from '../ControlBar/ControlBar';
import PlayListTitles from '../PlayListTitles/PlayListTitles';
import { PopupType, Track } from '../../redux/playlist/types';
import styles from './playlist.module.css';

interface PlayListProps {
  isFavorites?: boolean;
}

const PlayList: React.FC<PlayListProps> = ({ isFavorites = false }) => {
  const dispatch = useDispatch();
  const currentTrack = useSelector(selectCurrentTrack);
  const favoriteTracks: Track[] = useSelector(selectFavoriteTracks);
  const currentPlaylist: Track[] = useSelector(selectCurrentPlaylist);
  const isPlaying = useSelector(selectIsPlaying);
  const isRepeat = useSelector(selectIsRepeat);
  const isShuffle = useSelector(selectIsShuffle);
  const loading = useSelector(selectLoading);
  const favoritesLoading = useSelector(selectFavoritesLoading);
  const error = useSelector(selectError);
  const favoritesError = useSelector(selectFavoritesError);
  const activeFilter = useSelector(selectActiveFilter);
  const popups = useSelector(selectPopups);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isFavorites) {
      dispatch(fetchFavoriteTracks());
    } else {
      dispatch(fetchTracks());
    }
  }, [dispatch, isFavorites]);

  useEffect(() => {
    if (isFavorites) {
      dispatch(setCurrentPlaylist(favoriteTracks));
    } else {
      dispatch(setCurrentPlaylist(store.getState().playlist.tracks));
    }
  }, [favoriteTracks, isFavorites, dispatch]);

  const uniqueGenres = useMemo(() => 
    Array.from(new Set(currentPlaylist.map(track => (track.genre || 'Без жанра'))))
      .map(genre => String(genre).charAt(0).toUpperCase() + String(genre).slice(1).toLowerCase()), 
    [currentPlaylist]
  );

  const uniqueAuthors = useMemo(() => 
    Array.from(new Set(currentPlaylist.map(track => track.author))),
    [currentPlaylist]
  );

  const playTrack = useCallback((track: Track) => {
    if (audio) {
      audio.pause();
    }
    const newAudio = new Audio(track.track_file);
    newAudio.play();
    setAudio(newAudio);
    dispatch(setCurrentTrack(track));  
  }, [audio, dispatch]);

  const togglePlayPauseTrack = useCallback(() => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      dispatch(togglePlayPause());  
    }
  }, [audio, isPlaying, dispatch]);

  const nextTrackHandler = useCallback(() => {
    dispatch(nextTrack());  
    if (audio) {
      audio.pause();
    }
    const newTrack = store.getState().playlist.currentTrack;
    if (newTrack) {
      const newAudio = new Audio(newTrack.track_file);
      setAudio(newAudio);
      newAudio.play().catch((err) => console.error("Не удалось воспроизвести трек: ", err));
    }
  }, [audio, dispatch]);

  const previousTrackHandler = useCallback(() => {
    dispatch(previousTrack());  
    if (audio) {
      audio.pause();
    }
    const newTrack = store.getState().playlist.currentTrack;
    if (newTrack) {
      const newAudio = new Audio(newTrack.track_file);
      setAudio(newAudio);
      newAudio.play().catch((err) => console.error("Не удалось воспроизвести трек: ", err));
    }
  }, [audio, dispatch]);

  const handleShowPopup = useCallback((type: PopupType) => {
    dispatch(setPopups({ type, value: true }));
    dispatch(setActiveFilter(type));
  }, [dispatch]);

  const handleClosePopup = useCallback((type: PopupType) => {
    dispatch(setPopups({ type, value: false }));
    if (activeFilter === type) {
      dispatch(setActiveFilter(null));
    }
  }, [activeFilter, dispatch]);

  if ((loading && !isFavorites) || (favoritesLoading && isFavorites)) {
    return <div>Загрузка...</div>;
  }

  if (error && !isFavorites) {
    return <div>{error}</div>;
  }

  if (favoritesError && isFavorites) {
    return <div>{favoritesError}</div>;
  }

  return (
    <div className={styles.playlist}>
      <h2 className={styles.title}>{isFavorites ? 'Мои треки' : 'Треки'}</h2>
      <PlayListFilters
        activeFilter={activeFilter}
        popups={popups}
        getUniqueAuthors={uniqueAuthors}
        getUniqueGenres={uniqueGenres}
        handleShowPopup={handleShowPopup}
        handleClosePopup={handleClosePopup}
      />
      <div className={styles.playlistContent}>
        <PlayListTitles />
        <TrackList 
          tracks={currentPlaylist}  
          onPlayTrack={playTrack} 
          currentTrackId={currentTrack?._id || null}
          isPlaying={isPlaying} 
        />
      </div>
      <ControlBar
        currentTrack={currentTrack}
        audio={audio}
        onPlayPause={togglePlayPauseTrack}
        onShuffle={() => dispatch(setShuffle(!isShuffle))}
        onNextTrack={nextTrackHandler}
        onPreviousTrack={previousTrackHandler}
        isRepeat={isRepeat}
        isShuffle={isShuffle}
        onToggleRepeat={() => dispatch(setRepeat(!isRepeat))}
        onToggleShuffle={() => dispatch(setShuffle(!isShuffle))}
        currentTime={audio?.currentTime || 0}
        totalTime={currentTrack?.duration_in_seconds || 0}
      />
    </div>
  );
};

export default PlayList;
