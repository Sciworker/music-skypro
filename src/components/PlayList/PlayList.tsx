'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import axios from 'axios';
import styles from './playlist.module.css';
import NoteIcon from '../../../public/icon/note.svg';
import LikeIcon from '../../../public/icon/like-track.svg';
import ClickIcon from '../../../public/icon/watch.svg';
import Link from 'next/link';
import Popup from '../Popup/Popup';
import { changeDurationFormat } from '@/utils/changeDurationFormat';

interface Track {
  _id: number;
  name: string;
  author: string;
  release_date: string;
  album: string;
  duration_in_seconds?: number;
  genre?: string;
}

const PlayList: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const [popups, setPopups] = useState({
    author: false,
    release_date: false,
    genre: false,
  });

  const handleShowPopup = useCallback((type: keyof typeof popups) => {
    setPopups((prev) => ({ ...prev, [type]: true }));
    setActiveFilter(type);
  }, []);

  const handleClosePopup = useCallback((type: keyof typeof popups) => {
    setPopups((prev) => ({ ...prev, [type]: false }));
    if (activeFilter === type) {
      setActiveFilter(null);
    }
  }, [activeFilter]);

  const getUniqueAuthors = useMemo(() => 
    Array.from(new Set(tracks.map(track => track.author))), 
    [tracks]
  );

  const getUniqueGenres = useMemo(() => 
    Array.from(new Set(tracks.map(track => {
      const genre = track.genre || "Без жанра";
      return (typeof genre === 'string' ? genre.trim().toLowerCase() : String(genre).toLowerCase());
    }))).map(genre => genre.charAt(0).toUpperCase() + genre.slice(1)), 
    [tracks]
  );
  

  useEffect(() => {
    const fetchAllTracks = async () => {
      try {
        const response = await axios.get('https://webdev-music-003b5b991590.herokuapp.com/catalog/track/all/');
        const tracksData = response.data.data || [];

        setTracks(tracksData);
      } catch (err) {
        setError('Ошибка при загрузке данных');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllTracks();
  }, []);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;
  

  return (
    <div className={styles.playlist}>
      <h2 className={styles.title}>Треки</h2>
      <div className={styles.filter}>
        <div className={styles.searchBy}>Искать по:</div>
        <div className={styles.filters}>
          <div
            onClick={() => handleShowPopup('author')}
            className={`${styles.item} ${activeFilter === 'author' ? styles.active : ''}`}
          >
            <span>исполнителю</span>
            {popups.author && (
              <Popup content={getUniqueAuthors} onClose={() => handleClosePopup('author')} />
            )}
          </div>
          <div
            onClick={() => handleShowPopup('release_date')}
            className={`${styles.item} ${activeFilter === 'release_date' ? styles.active : ''}`}
          >
            <span>году выпуска</span>
            {popups.release_date && (
              <Popup content={['По умолчанию', 'Сначала новые', 'Сначала старые']} onClose={() => handleClosePopup('release_date')} />
            )}
          </div>
          <div
            onClick={() => handleShowPopup('genre')}
            className={`${styles.item} ${activeFilter === 'genre' ? styles.active : ''}`}
          >
            <span>жанру</span>
            {popups.genre && (
              <Popup content={getUniqueGenres} onClose={() => handleClosePopup('genre')} />
            )}
          </div>
        </div>
      </div>
      <div className={styles.playlistContent}>
        <div className={styles.playlistTitles}>
          <div className={styles.track}>Трек</div>
          <div className={styles.performer}>Исполнитель</div>
          <div className={styles.album}>Альбом</div>
          <div className={styles.duration}><ClickIcon className={styles.likeIcon}/></div>
        </div>
        <div className={styles.trackList}>
          {tracks.map((track) => (
            <div key={track._id} className={styles.trackItem}>
              <Link href='#' className={styles.trackTitle}>
                <div className={styles.image}><NoteIcon className={styles.note}/></div> 
                {track.name}
              </Link>
              <Link href='#' className={styles.trackAuthor}>{track.author}</Link>
              <Link href='#' className={styles.trackAlbum}>{track.album}</Link>
              <div className={styles.trackTime}>
                <LikeIcon className={styles.likeIcon}/> 
                {changeDurationFormat(track.duration_in_seconds ?? 0)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlayList;
