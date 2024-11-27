'use client';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, store } from '@/redux/store';
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
} from '../../redux/playlist/slice';
import {
  selectCurrentTrack,
  selectIsPlaying,
  selectIsRepeat,
  selectIsShuffle,
  selectLoading,
  selectError,
  selectPopups,
} from '../../redux/playlist/selectors';
import { selectFavoriteTracks, selectFavoritesLoading, selectFavoritesError } from '@/redux/favorites/selectors';
import PlayListFilters from '../PlayListFilters/PlayListFilters';
import TrackList from '../TrackList/TrackList';
import ControlBar from '../ControlBar/ControlBar';
import PlayListTitles from '../PlayListTitles/PlayListTitles';
import { PopupType, Track } from '../../redux/playlist/types';
import styles from './playlist.module.css';
import { useAudio } from '../AudioContext/AudioContext';
import { useDebounce } from '../../hooks/useDebounce';
import Skeleton from 'react-loading-skeleton';

interface PlayListProps {
  isFavorites?: boolean;
  selection?: { name: string; items: number[] } | null;
  searchTerm: string;
}

const MainPlayList: React.FC<PlayListProps> = ({ isFavorites = false, selection, searchTerm }) => {
  const dispatch = useAppDispatch();
  const currentTrack = useSelector(selectCurrentTrack);
  const favoriteTracks = useSelector(selectFavoriteTracks);
  const isPlaying = useSelector(selectIsPlaying);
  const isRepeat = useSelector(selectIsRepeat);
  const isShuffle = useSelector(selectIsShuffle);
  const loading = useSelector(selectLoading);
  const favoritesLoading = useSelector(selectFavoritesLoading);
  const error = useSelector(selectError);
  const favoritesError = useSelector(selectFavoritesError);
  const popups = useSelector(selectPopups);

  const { audio, setAudio } = useAudio();

  const [allTracks, setAllTracks] = useState<Track[]>([]);
  const [filteredTracks, setFilteredTracks] = useState<Track[]>([]);
  const [hasFetchedFavorites, setHasFetchedFavorites] = useState(false);
  const [activeGenres, setActiveGenres] = useState<string[]>([]);
  const [activeAuthors, setActiveAuthors] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<'new' | 'old' | null>(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const isLoading = useMemo(() => (isFavorites ? favoritesLoading : loading), [
    favoritesLoading,
    loading,
    isFavorites,
  ]);
  

  useEffect(() => {
    if (!isFavorites && !selection && allTracks.length === 0) {
      dispatch(fetchTracks()).then((result) => {
        if (result.payload && Array.isArray(result.payload)) {
          const newTracks = result.payload;
          if (JSON.stringify(allTracks) !== JSON.stringify(newTracks)) {
            setAllTracks(newTracks);
            setFilteredTracks(newTracks);
          }
        }
      });
    }
  }, [dispatch, isFavorites, selection, allTracks.length]);

  useEffect(() => {
    if (isFavorites && !favoritesLoading && !hasFetchedFavorites) {
      dispatch(fetchFavoriteTracks()).then((response) => {
        if (response.payload && Array.isArray(response.payload)) {
          const newTracks = response.payload;
          if (JSON.stringify(filteredTracks) !== JSON.stringify(newTracks)) {
            setFilteredTracks(newTracks);
          }
        }
        setHasFetchedFavorites(true);
      });
    } else if (selection) {
      const selectedTracks = allTracks.filter((track: Track) => selection.items.includes(track._id));
      if (JSON.stringify(filteredTracks) !== JSON.stringify(selectedTracks)) {
        setFilteredTracks(selectedTracks);
      }
    }
  }, [allTracks, favoriteTracks, selection, isFavorites, dispatch, favoritesLoading, hasFetchedFavorites]);

  useEffect(() => {
    if (isFavorites) {
      setFilteredTracks(favoriteTracks);
    }
  }, [isFavorites, favoriteTracks]);

  const uniqueGenres = useMemo(() => {
    const genresSet = new Set(
      filteredTracks.map((track) => (track.genre ? track.genre.toString().trim().toLowerCase() : 'без жанра'))
    );
    return Array.from(genresSet).map((genre) => genre.charAt(0).toUpperCase() + genre.slice(1));
  }, [filteredTracks]);

  const uniqueAuthors = useMemo(
    () => Array.from(new Set(filteredTracks.map((track) => track.author))),
    [filteredTracks]
  );

  const filteredAndSortedTracks = useMemo(() => {
    let tracks = [...filteredTracks];
    if (activeGenres.length > 0) {
      tracks = tracks.filter((track) =>
        track.genre && activeGenres.includes(String(track.genre).toLowerCase().trim())
      );
    }
    if (activeAuthors.length > 0) {
      tracks = tracks.filter((track) =>
        track.author && activeAuthors.includes(String(track.author).toLowerCase().trim())
      );
    }
    if (sortOrder === 'new') {
      tracks.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
    } else if (sortOrder === 'old') {
      tracks.sort((a, b) => new Date(a.release_date).getTime() - new Date(b.release_date).getTime());
    }
    return tracks;
  }, [filteredTracks, activeGenres, activeAuthors, sortOrder]);

  const finalFilteredTracks = useMemo(() => {
    return filteredAndSortedTracks.filter(
      (track) =>
        track.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        track.author?.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [filteredAndSortedTracks, debouncedSearchTerm]);

  const handleSelectAuthor = useCallback(
    (author: string) => {
      setActiveAuthors((prev) =>
        prev.includes(author.toLowerCase().trim())
          ? prev.filter((a) => a !== author.toLowerCase().trim())
          : [...prev, author.toLowerCase().trim()]
      );
    },
    []
  );
  
  const handleSelectGenre = useCallback(
    (genre: string) => {
      setActiveGenres((prev) =>
        prev.includes(genre.toLowerCase().trim())
          ? prev.filter((g) => g !== genre.toLowerCase().trim())
          : [...prev, genre.toLowerCase().trim()]
      );
    },
    []
  );
  

  const playTrack = useCallback(
    (track: Track) => {
      if (audio) audio.pause();
      const newAudio = new Audio(track.track_file ?? '');
      newAudio.play();
      setAudio(newAudio);
      dispatch(setCurrentTrack(track));
    },
    [audio, setAudio, dispatch]
  );

  const togglePlayPauseTrack = useCallback(() => {
    if (audio) {
      if (isPlaying) audio.pause();
      else audio.play();
      dispatch(togglePlayPause());
    }
  }, [audio, isPlaying, dispatch]);

  const nextTrackHandler = useCallback(() => {
    dispatch(nextTrack());
    if (audio) audio.pause();
    const newTrack = store.getState().playlist.currentTrack;
    if (newTrack) {
      const newAudio = new Audio(newTrack.track_file ?? '');
      setAudio(newAudio);
      newAudio.play().catch((err) => console.error('Failed to play track:', err));
    }
  }, [audio, setAudio, dispatch]);

  const previousTrackHandler = useCallback(() => {
    dispatch(previousTrack());
    if (audio) audio.pause();
    const newTrack = store.getState().playlist.currentTrack;
    if (newTrack) {
      const newAudio = new Audio(newTrack.track_file ?? '');
      setAudio(newAudio);
      newAudio.play().catch((err) => console.error('Failed to play track:', err));
    }
  }, [audio, setAudio, dispatch]);



  if (error && !isFavorites) {
    return <div>{error}</div>;
  }

  if (favoritesError && isFavorites) {
    return <div>{favoritesError}</div>;
  }

  return (
    <div className={styles.playlist}>
      <h2 className={styles.title}>
        {isLoading ? (
          <Skeleton height={50} width={700} />
        ) : isFavorites ? (
          'Мои треки'
        ) : selection ? (
          selection.name
        ) : (
          'Все треки'
        )}
      </h2>

      {isLoading ? (
        <Skeleton className={styles.filter} margin-top={40} height={40} width="50%" />
      ) : (
        <PlayListFilters
          activeFilter={null}
          popups={popups}
          getUniqueAuthors={uniqueAuthors}
          getUniqueGenres={uniqueGenres}
          handleShowPopup={(type: PopupType) => dispatch(setPopups({ type, value: true }))}
          handleClosePopup={(type: PopupType) => dispatch(setPopups({ type, value: false }))}
          onSelectAuthor={handleSelectAuthor}
          onSelectGenre={handleSelectGenre}
          onSelectReleaseDate={(releaseDate) =>
            setSortOrder(releaseDate === 'Сначала новые' ? 'new' : 'old')
          }
          activeAuthors={activeAuthors}
          activeGenres={activeGenres}
        />
      )}

      <div className={styles.playlistContent}>
            <PlayListTitles/>
            <TrackList
              tracks={finalFilteredTracks}
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

export default MainPlayList;
