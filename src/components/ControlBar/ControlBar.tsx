'use client';

import { useEffect, useState, useMemo, useCallback, memo } from 'react';
import styles from './control.module.css';
import PrevIcon from '../../../public/icon/prev.svg';
import PlayIcon from '../../../public/icon/play.svg';
import PauseIcon from '../../../public/icon/pause.svg';
import NextIcon from '../../../public/icon/next.svg';
import ReplayIcon from '../../../public/icon/repeat.svg';
import ShuffleIcon from '../../../public/icon/shuffle.svg';
import VolumeIcon from '../../../public/icon/volume.svg';
import LikeIcon from '../../../public/icon/like.svg';
import LikedIcon from '../../../public/icon/liked.svg';
import Link from 'next/link';
import { changeDurationFormat } from '@/utils/changeDurationFormat';
import { ControlBarProps } from '../../redux/playlist/types';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/redux/store';
import { addTrackToFavorites, removeTrackFromFavorites } from '@/redux/favorites/asyncActions';
import { selectFavoriteTracks } from '@/redux/favorites/selectors';
import { toast } from 'react-hot-toast';
import { useAudio } from '../AudioContext/AudioContext';

const ControlBar: React.FC<ControlBarProps> = ({
  currentTrack,
  onPlayPause,
  onNextTrack,
  onPreviousTrack,
  isRepeat,
  isShuffle,
  onToggleRepeat,
  onToggleShuffle,
  totalTime,
}) => {
  const dispatch = useAppDispatch();
  const favoriteTracks = useSelector(selectFavoriteTracks);

  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [repeatActive, setRepeatActive] = useState(isRepeat);
  const [shuffleActive, setShuffleActive] = useState(isShuffle);

  const { audio } = useAudio();

  useEffect(() => {
    if (audio) {
      audio.volume = volume;

      const updateProgress = () => {
        setProgress((audio.currentTime / audio.duration) * 100);
        setCurrentTime(audio.currentTime);
      };

      const updateDuration = () => setProgress((audio.currentTime / audio.duration) * 100);

      audio.addEventListener('timeupdate', updateProgress);
      audio.addEventListener('loadedmetadata', updateDuration);

      return () => {
        audio.removeEventListener('timeupdate', updateProgress);
        audio.removeEventListener('loadedmetadata', updateDuration);
      };
    }
  }, [audio, volume]);

  useEffect(() => {
    if (audio) {
      audio.onended = () => {
        if (isRepeat) {
          audio.currentTime = 0;
          audio.play();
        }
      };
    }
  }, [audio, isRepeat]);

  const isFavorite = useMemo(() => {
    return currentTrack ? favoriteTracks.some((track) => track._id === currentTrack._id) : false;
  }, [currentTrack, favoriteTracks]);

  const handleLikeClick = useCallback(() => {
    if (currentTrack) {
      if (isFavorite) {
        dispatch(removeTrackFromFavorites(currentTrack._id));
        toast.success(`${currentTrack.name} удалён из избранного`);
      } else {
        dispatch(addTrackToFavorites(currentTrack));
        toast.success(`${currentTrack.name} добавлен в избранное`);
      }
    }
  }, [currentTrack, isFavorite, dispatch]);

  const handleVolumeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVolume = Number(e.target.value) / 100;
      setVolume(newVolume);
      if (audio) audio.volume = newVolume;
    },
    [audio]
  );

  const handleLineChange = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (audio) {
        const { left, width } = e.currentTarget.getBoundingClientRect();
        const newTime = ((e.clientX - left) / width) * audio.duration;
        audio.currentTime = newTime;
        setProgress((newTime / audio.duration) * 100);
      }
    },
    [audio]
  );

  const handleToggleRepeat = useCallback(() => {
    onToggleRepeat();
    setRepeatActive((prev) => !prev);
  }, [onToggleRepeat]);

  const handleToggleShuffle = useCallback(() => {
    onToggleShuffle();
    setShuffleActive((prev) => !prev);
  }, [onToggleShuffle]);

  if (!audio) return null;

  return (
    <div className={styles.control}>
      <div className={styles.progressContainer} onClick={handleLineChange}>
        <div className={styles.progress} style={{ width: `${progress}%` }}></div>
      </div>
      <div className={styles.body}>
        <div className={styles.player}>
          <div className={styles.controlBtns}>
            <span data-testid="prev-button" className={styles.button} onClick={onPreviousTrack}>
              <PrevIcon className={styles.icon} />
            </span>
            <span
              data-testid={audio.paused ? 'play-button' : 'pause-button'}
              className={styles.button}
              onClick={onPlayPause}
            >
              {audio.paused ? <PlayIcon className={styles.icon} /> : <PauseIcon className={styles.icon} />}
            </span>
            <span data-testid="next-button" className={styles.button} onClick={onNextTrack}>
              <NextIcon className={styles.icon} />
            </span>
            <span
              data-testid="repeat-button"
              className={`${styles.button} ${repeatActive ? styles.active : ''}`}
              onClick={handleToggleRepeat}
            >
              <ReplayIcon className={styles.icon} />
            </span>
            <span
              data-testid="shuffle-button"
              className={`${styles.button} ${shuffleActive ? styles.active : ''}`}
              onClick={handleToggleShuffle}
            >
              <ShuffleIcon className={styles.icon} />
            </span>
          </div>
          {currentTrack && (
            <div className={styles.track}>
              <div className={styles.image}>
                <img src="../../note.png" alt="" />
              </div>
              <div className={styles.wrap}>
                <Link href="#" className={styles.author}>
                  {currentTrack.name}
                </Link>
                <Link href="#" className={styles.album}>
                  {currentTrack.author}
                </Link>
              </div>
              <div className={styles.actions}>
                <button
                  data-testid={isFavorite ? 'liked-button' : 'like-button'}
                  className={styles.button}
                  onClick={handleLikeClick}
                >
                  {isFavorite ? <LikedIcon className={styles.icon} /> : <LikeIcon className={styles.icon} />}
                </button>
              </div>
            </div>
          )}
        </div>
        <div className={styles.volume}>
          <span>
            {changeDurationFormat(currentTime)} / {changeDurationFormat(totalTime)}
          </span>
          <div className={styles.volumeWrap}>
            <VolumeIcon className={styles.icon} />
            <input
              type="range"
              name="range"
              aria-label="volume slider"
              value={volume * 100}
              onChange={handleVolumeChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ControlBar);
