import React from 'react';
import styles from './main.module.css';
import SearchBar from '../SearchBar/SearchBar';
import MainPlayList from '../MainPlayList/MainPlayList';

interface MainBlockProps {
  isFavorites?: boolean;
  selection?: any;
}

const MainBlock: React.FC<MainBlockProps> = ({ isFavorites = false, selection }) => {
  return (
    <div className={styles.main}>
      <SearchBar />
      <MainPlayList isFavorites={isFavorites} selection={selection} />
    </div>
  );
};

export default MainBlock;

