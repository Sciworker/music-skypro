import React from 'react'
import styles from './navbar.module.css';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <Image width={113} height={17} src='/logo.png' alt='logo'></Image>
      </div>
      <div className={styles.burger}>
        <span className={styles.burgerLine}></span>
        <span className={styles.burgerLine}></span>
        <span className={styles.burgerLine}></span>
      </div>
      <nav className={styles.nav}>
        <ul className={styles.menu}>
          <li className={styles.menuItem}>
            <Link href="#">Главное</Link>
          </li>
          <li className={styles.menuItem}>
            <Link href="#">Мой плейлист</Link>
          </li>
          <li className={styles.menuItem}>
            <Link href="#">Войти</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
