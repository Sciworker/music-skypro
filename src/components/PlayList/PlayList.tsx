'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  setCurrentTrack,
  togglePlayPause,
  setRepeat,
  setShuffle,
  nextTrack,
  previousTrack,
  setActiveFilter,
  setPopups,
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
import PlayListFilters from '../PlayListFilters/PlayListFilters';
import TrackList from '../TrackList/TrackList';
import ControlBar from '../ControlBar/ControlBar';
import PlayListTitles from '../PlayListTitles/PlayListTitles';
import { fetchTracks } from '../../redux/playlist/asyncActions';
import { PopupType, Track } from '../../redux/playlist/types';
import { store, useAppDispatch } from '@/redux/store';
import styles from './playlist.module.css';

const PlayList: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTrack = useSelector(selectCurrentTrack);
  const currentPlaylist = useSelector(selectCurrentPlaylist);
  const isPlaying = useSelector(selectIsPlaying);
  const isRepeat = useSelector(selectIsRepeat);
  const isShuffle = useSelector(selectIsShuffle);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const activeFilter = useSelector(selectActiveFilter);
  const popups = useSelector(selectPopups);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    dispatch(fetchTracks());
  }, [dispatch]);

  const playTrack = (track:Track) => {
    if (audio) {
      audio.pause();
    }
    const newAudio = new Audio(track.track_file);
    newAudio.play();
    setAudio(newAudio);
    dispatch(setCurrentTrack(track));
  };

  const togglePlayPauseTrack = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      dispatch(togglePlayPause());
    }
  };
  
  const nextTrackHandler = () => {
    dispatch(nextTrack());
  
    if (audio) {
      audio.pause();
    }
  
    const newTrack = store.getState().playlist.currentTrack;
  
    if (newTrack) {
      const newAudio = new Audio(newTrack.track_file);
      
      setAudio(newAudio);
  
      try {
        newAudio.play();
      } catch (err) {
        console.error("Не удалось воспроизвести трек: ", err);
      }
    }
  };
  
  const previousTrackHandler = () => {
    dispatch(previousTrack());  

    if (audio) {
      audio.pause();
    }

    const newTrack = store.getState().playlist.currentTrack;
  
    if (newTrack) {
      const newAudio = new Audio(newTrack.track_file);
      
      setAudio(newAudio);
      try {
        newAudio.play();
      } catch (err) {
        console.error("Не удалось воспроизвести трек: ", err);
      }
    }
  };


  const handleShowPopup = (type: PopupType) => {
    dispatch(setPopups({ type, value: true }));
    dispatch(setActiveFilter(type));
  };

  const handleClosePopup = (type: PopupType) => {
    dispatch(setPopups({ type, value: false }));
    if (activeFilter === type) {
      dispatch(setActiveFilter(null));
    }
  };

  const getUniqueGenres = () =>
    Array.from(new Set(currentPlaylist.map(track => (track.genre || 'Без жанра'))))
      .map(genre => String(genre).charAt(0).toUpperCase() + String(genre).slice(1).toLowerCase());

  const getUniqueAuthors = () =>
    Array.from(new Set(currentPlaylist.map(track => track.author)));

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.playlist}>
      <h2 className={styles.title}>Треки</h2>
      <PlayListFilters
        activeFilter={activeFilter}
        popups={popups}
        getUniqueAuthors={getUniqueAuthors()}
        getUniqueGenres={getUniqueGenres()}
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
