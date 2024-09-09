import React from 'react';
import styles from './tracklist.module.css';
import NoteIcon from '../../../public/icon/note.svg';
import LikeIcon from '../../../public/icon/like-track.svg';
import Link from 'next/link';
import { changeDurationFormat } from '@/utils/changeDurationFormat';
import { TrackListProps } from '../../types/types';

const TrackList: React.FC<TrackListProps> = ({ tracks, onPlayTrack, currentTrackId, isPlaying }) => {
  return (
    <div className={styles.trackList}>
      {tracks.map((track) => (
        <div key={track._id} className={styles.trackItem}>
          <Link
            href='#'
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
          <Link href='#' className={styles.trackAuthor}>{track.author}</Link>
          <Link href='#' className={styles.trackAlbum}>{track.album}</Link>
          <div className={styles.trackTime}>
            <LikeIcon className={styles.likeIcon} />
            {changeDurationFormat(track.duration_in_seconds ?? 0)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrackList;
