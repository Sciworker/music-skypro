import React from 'react'
import styles from './control.module.css'
import NoteIcon from '../../../public/icon/note.svg';
import PrevIcon from '../../../public/icon/prev.svg';
import PlayIcon from '../../../public/icon/play.svg';
import NextIcon from '../../../public/icon/next.svg';
import ReplayIcon from '../../../public/icon/repeat.svg';
import ShuffleIcon from '../../../public/icon/shuffle.svg';
import VolumeIcon from '../../../public/icon/volume.svg';
import LikeIcon from '../../../public/icon/like.svg';
import DisLikeIcon from '../../../public/icon/dislike.svg';
import Link from 'next/link';

const ControlBar = () => {
  return (
    <div className={styles.control}>
      <div className={styles.progress}></div>
      <div className={styles.body}>
        <div className={styles.player}>
            <div className={styles.controlBtns}>
                <PrevIcon className={styles.prevIcon} width={15} height={14}/>
                <PlayIcon className={styles.playIcon}/>
                <NextIcon className={styles.nextIcon}/>
                <ReplayIcon width={18} height={11} className={styles.replayIcon}/>
                <ShuffleIcon width={18} height={11} className={styles.shuffleIcon}/>
            </div>
            <div className={styles.track}>
                <div className={styles.image}><NoteIcon className={styles.note}/></div>
                <div className={styles.wrap}>
                    <Link href='#' className={styles.author}>Ты та...</Link>
                    <Link href='#' className={styles.album}>Баста</Link>
                </div>
            </div>
            <div className={styles.actions}>
                <LikeIcon className={styles.likeIcon}/>
                <DisLikeIcon className={styles.disLikeIcon}/>
            </div>
        </div>
        <div className={styles.volume}>
            <div className={styles.volumeWrap}>
                <VolumeIcon />
                <input type="range" name='range'/>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ControlBar
