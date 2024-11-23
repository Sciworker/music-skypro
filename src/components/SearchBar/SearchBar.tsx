import React, { useState } from 'react';
import styles from './search.module.css';

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [prevValue, setPrevValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    if (value !== prevValue) {
      onSearch(value);
      setPrevValue(value);
    }
  };

  return (
    <div className={styles.search}>
      <div className={styles.body}>
        <input
          className={styles.input}
          type="text"
          placeholder="Поиск..."
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default SearchBar;
