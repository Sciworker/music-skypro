'use client'

import React, { useState } from 'react';
import styles from './navbar.module.css';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles.navbar}>
      <Link href='/' className={styles.logo}>
        <Image width={113} height={17} src='/logo.png' alt='logo'></Image>
      </Link>
      <div className={styles.burger} onClick={toggleMenu}>
        <span className={styles.burgerLine}></span>
        <span className={styles.burgerLine}></span>
        <span className={styles.burgerLine}></span>
      </div>
      <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
        <ul className={styles.menu}>
          <li className={styles.menuItem}>
            <Link href="/">Главное</Link>
          </li>
          <li className={styles.menuItem}>
            <Link href="/favorites">Мой плейлист</Link>
          </li>
          <li className={styles.menuItem}>
            <Link href="#">Войти</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
