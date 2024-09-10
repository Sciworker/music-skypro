import styles from './titles.module.css';
import ClickIcon from '../../../public/icon/watch.svg';

const PlayListTitles: React.FC = () => {
  return (
    <div className={styles.playlistTitles}>
      <div className={styles.track}>Трек</div>
      <div className={styles.performer}>Исполнитель</div>
      <div className={styles.album}>Альбом</div>
      <div className={styles.duration}><ClickIcon className={styles.likeIcon}/></div>
    </div>
  );
};

export default PlayListTitles;