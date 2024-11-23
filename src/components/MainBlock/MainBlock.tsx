import React, { useState } from 'react';
import styles from './main.module.css';
import SearchBar from '../SearchBar/SearchBar';
import MainPlayList from '../MainPlayList/MainPlayList';

interface MainBlockProps {
  isFavorites?: boolean;
  selection?: any;
}

const MainBlock: React.FC<MainBlockProps> = ({ isFavorites = false, selection }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <div className={styles.main}>
      <SearchBar onSearch={setSearchTerm} />
      <MainPlayList isFavorites={isFavorites} selection={selection} searchTerm={searchTerm} />
    </div>
  );
};

export default MainBlock;
