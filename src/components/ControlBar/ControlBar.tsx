'use client';

import { useEffect, useState } from 'react';
import styles from './control.module.css';
import PrevIcon from '../../../public/icon/prev.svg';
import PlayIcon from '../../../public/icon/play.svg';
import PauseIcon from '../../../public/icon/pause.svg';
import NextIcon from '../../../public/icon/next.svg';
import ReplayIcon from '../../../public/icon/repeat.svg';
import ShuffleIcon from '../../../public/icon/shuffle.svg';
import VolumeIcon from '../../../public/icon/volume.svg';
import LikeIcon from '../../../public/icon/like.svg';
import DisLikeIcon from '../../../public/icon/dislike.svg';
import NoteIcon from '../../../public/icon/note.svg';
import Link from 'next/link';
import { changeDurationFormat } from '@/utils/changeDurationFormat';
import { ControlBarProps } from '../../redux/playlist/types';


const ControlBar: React.FC<ControlBarProps> = ({
  currentTrack,
  audio,
  onPlayPause,
  onNextTrack,
  onPreviousTrack,
  isRepeat,
  isShuffle,
  onToggleRepeat,
  onToggleShuffle,
  totalTime
}) => {
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (audio) {
      audio.volume = volume;
  
      const updateProgress = () => {
        setProgress((audio.currentTime / audio.duration) * 100);
        setCurrentTime(audio.currentTime); // Обновляем текущее время
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

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value) / 100;
    setVolume(newVolume);
    if (audio) audio.volume = newVolume;
  };

  const handleLineChange = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (audio) {
      const { left, width } = e.currentTarget.getBoundingClientRect();
      const newTime = ((e.clientX - left) / width) * audio.duration;
      audio.currentTime = newTime;
      setProgress((newTime / audio.duration) * 100);
    }
  };

  if (!audio) return null;

  return (
    <div className={styles.control}>
      <div className={styles.progressContainer} onClick={handleLineChange}>
        <div className={styles.progress} style={{ width: `${progress}%` }}></div>
      </div>
      <div className={styles.body}>
        <div className={styles.player}>
          <div className={styles.controlBtns}>
            <PrevIcon className={styles.prevIcon} width={15} height={14} onClick={onPreviousTrack} />
            {audio.paused ? (
              <PlayIcon className={styles.playIcon} onClick={onPlayPause} width={18} height={18} />
            ) : (
              <PauseIcon className={styles.playIcon} onClick={onPlayPause} width={18} height={22} />
            )}
            <NextIcon className={styles.nextIcon} onClick={onNextTrack} />
            <ReplayIcon 
              width={18} 
              height={11} 
              className={isRepeat ? styles.activeReplayIcon : styles.replayIcon} 
              onClick={onToggleRepeat} 
            />
            <ShuffleIcon
            width={18}
            height={11}
            className={isShuffle ? styles.activeShuffleIcon : styles.shuffleIcon} 
            onClick={onToggleShuffle}
          />
          </div>
          {currentTrack && (
            <div className={styles.track}>
              <div className={styles.image}><NoteIcon className={styles.note} /></div>
              <div className={styles.wrap}>
                <Link href='#' className={styles.author}>{currentTrack.name}</Link>
                <Link href='#' className={styles.album}>{currentTrack.author}</Link>
              </div>
              <div className={styles.actions}>
                <LikeIcon className={styles.likeIcon} />
                <DisLikeIcon className={styles.disLikeIcon} />
              </div>
            </div>
          )}
        </div>
        <div className={styles.volume}>
          <span>{changeDurationFormat(currentTime)} / {changeDurationFormat(totalTime)}</span>
          <div className={styles.volumeWrap}>
            <VolumeIcon />
            <input 
              type="range" 
              name='range' 
              value={volume * 100}
              onChange={handleVolumeChange} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlBar;