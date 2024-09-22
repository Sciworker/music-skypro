'use client'

import React, { useEffect } from 'react';
import styles from './sidebar.module.css';
import LogOutIcon from '../../../public/icon/logout.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { logout, initializeAuth } from '../../redux/auth/slice';
import { selectAuthState } from '../../redux/auth/selectors';
import { useRouter } from 'next/navigation';

const Sidebar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { username } = useSelector(selectAuthState);

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/signin');
  };

  return (
    <div className={styles.sidebar}> 
      <div className={styles.personal}>
        <div className={styles.name}>
          {username ? username : 'Гость'}
        </div>
        <div className={styles.icon} onClick={handleLogout}>
          <LogOutIcon width={25} height={25} className={styles.logout} />
        </div>
      </div>
      <div className={styles.list}>
        <Link className={styles.link} href='#'>
          <Image width={250} height={150} src='/playlist01.png' alt='playlist' quality={100} />
        </Link>
        <Link className={styles.link} href='#'>
          <Image width={250} height={150} src='/playlist02.png' alt='playlist' quality={100} />
        </Link>
        <Link className={styles.link} href='#'>
          <Image width={250} height={150} src='/playlist03.png' alt='playlist' quality={100} />
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;

