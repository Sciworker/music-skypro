import React from 'react'
import styles from './main.module.css'
import SearchBar from '../SearchBar/SearchBar'
import PlayList from '../PlayList/PlayList'

const MainBlock = () => {
  return (
    <div className={styles.main}>
        <SearchBar />
        <PlayList />
    </div>
  )
}

export default MainBlock
