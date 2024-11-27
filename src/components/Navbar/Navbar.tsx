'use client';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, RootState } from '../../redux/store';
import { logout } from '../../redux/auth/slice';
import styles from './navbar.module.css';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = useSelector((state:RootState) => state.auth.isLoggedIn);
  const dispatch = useAppDispatch();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className={styles.navbar}>
      <Link href="/" className={styles.logo}>
        <Image width={113} height={17} src="/logo.png" alt="logo" />
      </Link>
      <div
        className={styles.burger}
        onClick={toggleMenu}
        role="button"
        aria-label="Toggle menu"
      >
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
          {isLoggedIn ? (
            <li className={styles.menuItem}>
              <span onClick={handleLogout}>
                Выйти
              </span>
            </li>
          ) : (
            <li className={styles.menuItem}>
              <Link href="/signin">Войти</Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
