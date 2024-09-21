import React from 'react';
import styles from './main.module.css';
import SearchBar from '../SearchBar/SearchBar';
import PlayList from '../PlayList/PlayList';

interface MainBlockProps {
  isFavorites?: boolean;
}

const MainBlock: React.FC<MainBlockProps> = ({ isFavorites = false }) => {
  return (
    <div className={styles.main}>
      <SearchBar />
      <PlayList isFavorites={isFavorites} /> 
    </div>
  );
};

export default MainBlock;
