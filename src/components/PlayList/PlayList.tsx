'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import styles from './playlist.module.css';
import PlayListFilters from '../PlayListFilters/PlayListFilters';
import TrackList from '../TrackList/TrackList';
import ControlBar from '../ControlBar/ControlBar';
import PlayListTitles from '../PlayListTitles/PlayListTitles';
import { Track, PopupType } from '../../types/types';
import { fetchTracks } from '../../modules/api';

const PlayList: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<PopupType | null>(null);
  const [popups, setPopups] = useState<Record<PopupType, boolean>>({
    author: false,
    release_date: false,
    genre: false,
  });
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isRepeat, setIsRepeat] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const loadTracks = async () => {
      try {
        const tracksData = await fetchTracks();
        setTracks(tracksData);
      } catch (err) {
        setError('Ошибка при загрузке данных');
      } finally {
        setLoading(false);
      }
    };

    loadTracks();
  }, []);

  useEffect(() => {
    if (audio) {
      const updateTime = () => setCurrentTime(audio.currentTime);
      audio.addEventListener('timeupdate', updateTime);
      return () => audio.removeEventListener('timeupdate', updateTime);
    }
  }, [audio]);

  const playTrack = (track: Track) => {
    if (audio) audio.pause();
    const newAudio = new Audio(track.track_file);
    newAudio.play();
    setAudio(newAudio);
    setCurrentTrack(track);
  };

  const playPauseTrack = () => {
    if (audio) audio.paused ? audio.play() : audio.pause();
  };

  const shuffleTrack = () => alert('Еще не реализовано');
  const nextTrack = () => alert('Еще не реализовано');
  const previousTrack = () => alert('Еще не реализовано');

  const getUniqueGenres = useMemo(() => 
    Array.from(new Set(tracks.map(track => {
      const genre = track.genre || "Без жанра";
      return (typeof genre === 'string' ? genre.trim().toLowerCase() : String(genre).toLowerCase());
    }))).map(genre => genre.charAt(0).toUpperCase() + genre.slice(1)), 
    [tracks]
  );

  const getUniqueAuthors = useMemo(() => 
    Array.from(new Set(tracks.map(track => track.author))), 
    [tracks]
  );

  const handleShowPopup = useCallback((type: PopupType) => {
    setPopups(prev => ({ ...prev, [type]: true }));
    setActiveFilter(type);
  }, []);

  const handleClosePopup = useCallback((type: PopupType) => {
    setPopups(prev => ({ ...prev, [type]: false }));
    if (activeFilter === type) setActiveFilter(null);
  }, [activeFilter]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.playlist}>
      <h2 className={styles.title}>Треки</h2>
      <PlayListFilters 
        activeFilter={activeFilter} 
        popups={popups} 
        getUniqueAuthors={getUniqueAuthors} 
        getUniqueGenres={getUniqueGenres} 
        handleShowPopup={handleShowPopup} 
        handleClosePopup={handleClosePopup}
      />
      <div className={styles.playlistContent}>
        <PlayListTitles />
        <TrackList 
          tracks={tracks} 
          onPlayTrack={playTrack} 
          currentTrackId={currentTrack?._id || null} 
        />
      </div>
      <ControlBar
        currentTrack={currentTrack}
        audio={audio}
        onPlayPause={playPauseTrack}
        onShuffle={shuffleTrack}
        onNextTrack={nextTrack}
        onPreviousTrack={previousTrack}
        isRepeat={isRepeat}
        onToggleRepeat={() => setIsRepeat(prev => !prev)}
        currentTime={currentTime} 
        totalTime={currentTrack?.duration_in_seconds || 0}
      />
    </div>
  );
};

export default PlayList;
