import React from 'react'
import styles from './playlist.module.css'
import NoteIcon from '../../../public/icon/note.svg';
import LikeIcon from '../../../public/icon/like-track.svg';
import ClickIcon from '../../../public/icon/watch.svg';
import Link from 'next/link';

const PlayList = () => {
  return (
    <div className={styles.playlist}>
      <h2 className={styles.title}>
        Треки
      </h2>
      <div className={styles.filter}>
        <div className={styles.searchBy}>Искать по:</div>
        <div className={styles.filters}>
            <div className={styles.item}>
                исполнителю
            </div>
            <div className={styles.item}>
                году выпуска
            </div>
            <div className={styles.item}>
                жанру
            </div>
        </div>
      </div>
      <div className={styles.playlistContent}>
        <div className={styles.playlistTitles}>
            <div className={styles.track}>
                Трек
            </div>
            <div className={styles.performer}>
                Исполнитель
            </div>
            <div className={styles.album}>
                Альбом
            </div>
            <div className={styles.duration}>
                <ClickIcon className={styles.likeIcon}/>
            </div>
        </div>
        <div className={styles.trackList}>
            <div className={styles.trackItem}>
                <Link href='#' className={styles.trackTitle}><div className={styles.image}><NoteIcon className={styles.note}/></div> Guilt</Link>
                <Link href='#' className={styles.trackAuthor}>Nero</Link>
                <Link href='#' className={styles.trackAlbum}>Welcome Reality</Link>
                <div className={styles.trackTime}><LikeIcon className={styles.likeIcon}/> 4:44</div>
            </div>
            <div className={styles.trackItem}>
                <Link href='#' className={styles.trackTitle}><div className={styles.image}><NoteIcon className={styles.note}/></div> Elektro</Link>
                <Link href='#' className={styles.trackAuthor}>Dynoro, Outwork, Mr. Gee</Link>
                <Link href='#' className={styles.trackAlbum}>Elektro</Link>
                <div className={styles.trackTime}><LikeIcon className={styles.likeIcon}/>2:22</div>
            </div>
            <div className={styles.trackItem}>
                <Link href='#' className={styles.trackTitle}><div className={styles.image}><NoteIcon className={styles.note}/></div>I’m Fire</Link>
                <Link href='#' className={styles.trackAuthor}>Ali Bakgor</Link>
                <Link href='' className={styles.trackAlbum}>I’m Fire</Link>
                <div className={styles.trackTime}><LikeIcon className={styles.likeIcon}/>2:22</div>
            </div>
            <div className={styles.trackItem}>
                <Link href='#' className={styles.trackTitle}><div className={styles.image}><NoteIcon className={styles.note}/></div>Non Stop (Remix)</Link>
                <Link href='#' className={styles.trackAuthor}>Стоункат, Psychopath</Link>
                <Link href='#'  className={styles.trackAlbum}>Non Stop</Link>
                <div className={styles.trackTime}><LikeIcon className={styles.likeIcon}/>4:12</div>
            </div>
            <div className={styles.trackItem}>
                <Link href='#' className={styles.trackTitle}><div className={styles.image}><NoteIcon className={styles.note}/></div>Run Run (feat. AR/CO)</Link>
                <Link href='#' className={styles.trackAuthor}>Jaded, Will Clarke, AR/CO</Link>
                <Link href='#'  className={styles.trackAlbum}>Run Run</Link>
                <div className={styles.trackTime}><LikeIcon className={styles.likeIcon}/>2:54</div>
            </div>
            <div className={styles.trackItem}>
                <Link href='#' className={styles.trackTitle}><div className={styles.image}><NoteIcon className={styles.note}/></div>Eyes on Fire (Zeds Dead Remix)</Link>
                <Link href='#' className={styles.trackAuthor}>Blue Foundation, Zeds Dead</Link>
                <Link href='#'  className={styles.trackAlbum}>Eyes on Fire</Link>
                <div className={styles.trackTime}><LikeIcon className={styles.likeIcon}/>5:20</div>
            </div>
            <div className={styles.trackItem}>
                <Link href='#' className={styles.trackTitle}><div className={styles.image}><NoteIcon className={styles.note}/></div>Mucho Bien (Hi Profile Remix)</Link>
                <Link href='#' className={styles.trackAuthor}>HYBIT, Mr. Black, Offer Nissim, Hi Profile</Link>
                <Link href='#'  className={styles.trackAlbum}>Mucho Bien</Link>
                <div className={styles.trackTime}><LikeIcon className={styles.likeIcon}/>3:41</div>
            </div>
            <div className={styles.trackItem}>
                <Link href='#' className={styles.trackTitle}><div className={styles.image}><NoteIcon className={styles.note}/></div>Knives n Cherries</Link>
                <Link href='#' className={styles.trackAuthor}>minthaze</Link>
                <Link href='#'  className={styles.trackAlbum}>Captivating</Link>
                <div className={styles.trackTime}><LikeIcon className={styles.likeIcon}/>1:48</div>
            </div>
            <div className={styles.trackItem}>
                <Link href='#' className={styles.trackTitle}><div className={styles.image}><NoteIcon className={styles.note}/></div>Knives n Cherries</Link>
                <Link href='#' className={styles.trackAuthor}>minthaze</Link>
                <Link href='#'  className={styles.trackAlbum}>Captivating</Link>
                <div className={styles.trackTime}><LikeIcon className={styles.likeIcon}/>1:48</div>
            </div>
            <div className={styles.trackItem}>
                <Link href='#' className={styles.trackTitle}><div className={styles.image}><NoteIcon className={styles.note}/></div>Knives n Cherries</Link>
                <Link href='#' className={styles.trackAuthor}>minthaze</Link>
                <Link href='#'  className={styles.trackAlbum}>Captivating</Link>
                <div className={styles.trackTime}><LikeIcon className={styles.likeIcon}/>1:48</div>
            </div>
            <div className={styles.trackItem}>
                <Link href='#' className={styles.trackTitle}><div className={styles.image}><NoteIcon className={styles.note}/></div>Knives n Cherries</Link>
                <Link href='#' className={styles.trackAuthor}>minthaze</Link>
                <Link href='#'  className={styles.trackAlbum}>Captivating</Link>
                <div className={styles.trackTime}><LikeIcon className={styles.likeIcon}/>1:48</div>
            </div>
            <div className={styles.trackItem}>
                <Link href='#' className={styles.trackTitle}><div className={styles.image}><NoteIcon className={styles.note}/></div>Knives n Cherries</Link>
                <Link href='#' className={styles.trackAuthor}>minthaze</Link>
                <Link href='#'  className={styles.trackAlbum}>Captivating</Link>
                <div className={styles.trackTime}><LikeIcon className={styles.likeIcon}/>1:48</div>
            </div>
            <div className={styles.trackItem}>
                <Link href='#' className={styles.trackTitle}><div className={styles.image}><NoteIcon className={styles.note}/></div>Knives n Cherries</Link>
                <Link href='#' className={styles.trackAuthor}>minthaze</Link>
                <Link href='#'  className={styles.trackAlbum}>Captivating</Link>
                <div className={styles.trackTime}><LikeIcon className={styles.likeIcon}/>1:48</div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default PlayList
