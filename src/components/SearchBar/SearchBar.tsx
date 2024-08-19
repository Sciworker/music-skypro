import React from 'react'
import styles from './search.module.css'
import SearchIcon from '../../../public/icon/search.svg';

const SearchBar = () => {
  return (
    <div className={styles.search}>
      <div className={styles.body}>
          <SearchIcon className={styles.searchIcon}/>
          <input className={styles.input} type="text" placeholder='Поиск...'/>
      </div>
    </div>
  )
}

export default SearchBar
