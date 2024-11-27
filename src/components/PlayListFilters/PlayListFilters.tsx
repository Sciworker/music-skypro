import React, { memo } from 'react';
import styles from './filters.module.css';
import Popup from '../Popup/Popup';
import { FiltersProps } from '../../redux/playlist/types';

interface PlayListFiltersProps extends FiltersProps {
  activeAuthors: string[];
  activeGenres: string[];
  onSelectAuthor: (author: string) => void;
  onSelectGenre: (genre: string) => void;
  onSelectReleaseDate: (releaseDate: string) => void;
}

const PlayListFilters: React.FC<PlayListFiltersProps> = ({
  activeFilter,
  popups,
  getUniqueAuthors,
  getUniqueGenres,
  handleShowPopup,
  handleClosePopup,
  onSelectAuthor,
  onSelectGenre,
  onSelectReleaseDate,
  activeAuthors,
  activeGenres,
}) => (
  <div className={styles.filter}>
    <div className={styles.searchBy}>Искать по:</div>
    <div className={styles.filters}>
      <div
        onClick={() => handleShowPopup('author')}
        className={`${styles.item} ${activeFilter === 'author' ? styles.active : ''}`}
      >
        <span>
          исполнителю{' '}
          {activeAuthors.length > 0 && <div className={styles.authorCircle}>{activeAuthors.length}</div>}
        </span>
        {popups.author && (
          <Popup
            content={getUniqueAuthors}
            onClose={() => handleClosePopup('author')}
            onSelect={(selectedAuthor) => onSelectAuthor(selectedAuthor)}
            activeItems={activeAuthors}
          />
        )}
      </div>
      <div
        onClick={() => handleShowPopup('release_date')}
        className={`${styles.item} ${activeFilter === 'release_date' ? styles.active : ''}`}
      >
        <span>году выпуска</span>
        {popups.release_date && (
          <Popup
            content={['По умолчанию', 'Сначала новые', 'Сначала старые']}
            onClose={() => handleClosePopup('release_date')}
            onSelect={(selectedReleaseDate) => onSelectReleaseDate(selectedReleaseDate)}
            activeItems={[]}
          />
        )}
      </div>
      <div
        onClick={() => handleShowPopup('genre')}
        className={`${styles.item} ${activeFilter === 'genre' ? styles.active : ''}`}
      >
        <span>
          жанру{' '}
          {activeGenres.length > 0 && <div className={styles.genreCircle}>{activeGenres.length}</div>}
        </span>
        {popups.genre && (
          <Popup
            content={getUniqueGenres}
            onClose={() => handleClosePopup('genre')}
            onSelect={(selectedGenre) => onSelectGenre(selectedGenre)}
            activeItems={activeGenres}
          />
        )}
      </div>
    </div>
  </div>
);

export default memo(PlayListFilters);
