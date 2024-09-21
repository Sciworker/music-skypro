import React from 'react';
import styles from './filters.module.css'
import Popup from '../Popup/Popup';
import { FiltersProps } from '../../redux/playlist/types';



const PlayListFilters: React.FC<FiltersProps> = ({
  activeFilter,
  popups,
  getUniqueAuthors,
  getUniqueGenres,
  handleShowPopup,
  handleClosePopup,
}) => (
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
);

export default PlayListFilters;
