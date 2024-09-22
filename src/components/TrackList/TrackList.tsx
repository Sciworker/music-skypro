import React from 'react';
import styles from './tracklist.module.css';
import NoteIcon from '../../../public/icon/note.svg';
import LikeIcon from '../../../public/icon/like-track.svg';
import LikedIcon from '../../../public/icon/liked.svg';
import Link from 'next/link';
import { changeDurationFormat } from '@/utils/changeDurationFormat';
import { TrackListProps, Track } from '../../redux/playlist/types';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/redux/store';
import { addTrackToFavorites, removeTrackFromFavorites } from '@/redux/favorites/asyncActions';
import { selectFavoriteTracks } from '@/redux/favorites/selectors';
import { toast } from 'react-hot-toast';

const TrackList: React.FC<TrackListProps> = ({ tracks, onPlayTrack, currentTrackId, isPlaying }) => {
  const dispatch = useAppDispatch();
  const favoriteTracks = useSelector(selectFavoriteTracks);

  const isFavorite = (trackId: number) => {
    return favoriteTracks && Array.isArray(favoriteTracks) && favoriteTracks.some((track) => track._id === trackId);
  };

  const handleLikeClick = (track: Track) => {
    if (isFavorite(track._id)) {
      dispatch(removeTrackFromFavorites(track._id));
      toast.success(`${track.name} удалён из избранного`);
    } else {
      dispatch(addTrackToFavorites(track));
      toast.success(`${track.name} добавлен в избранное`);
    }
  };

  if (!Array.isArray(tracks) || tracks.length === 0) {
    return <div>Нет доступных треков</div>;
  }

  return (
    <div className={styles.trackList}>
      {tracks.map((track: Track) => (
        <div key={track._id} className={styles.trackItem}>
          <Link
            href='#'
            passHref
            className={`${styles.trackTitle} ${track._id === currentTrackId ? styles.activeTrack : ''}`}
            onClick={(e) => {
              e.preventDefault();
              onPlayTrack(track);
            }}
          >
            <div className={styles.image}>
              {track._id === currentTrackId ? (
                isPlaying ? (
                  <div className={styles.circle}></div>
                ) : (
                  <div className={styles.circleStatic}></div>
                )
              ) : (
                <NoteIcon className={styles.note} />
              )}
            </div>
            {track.name}
          </Link>
          <Link href='#' passHref className={styles.trackAuthor}>{track.author}</Link>
          <Link href='#' passHref className={styles.trackAlbum}>{track.album}</Link>
          <div className={styles.trackTime}>
            {isFavorite(track._id) ? (
              <LikedIcon className={styles.likedIcon} onClick={() => handleLikeClick(track)} />
            ) : (
              <LikeIcon className={styles.likeIcon} onClick={() => handleLikeClick(track)} />
            )}
            {changeDurationFormat(track.duration_in_seconds ?? 0)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrackList;
