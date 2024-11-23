'use client';

import React, { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './sidebar.module.css';
import LogOutIcon from '../../../public/icon/logout.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/redux/store';
import { logout, initializeAuth } from '../../redux/auth/slice';
import { selectAuthState } from '../../redux/auth/selectors';
import { selectSelections, selectSelectionsLoading, selectSelectionsError } from '../../redux/selections/selectors';
import { fetchAllSelections } from '../../redux/selections/asyncActions';
import { useRouter } from 'next/navigation';

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { username } = useSelector(selectAuthState);

  const selections = useSelector(selectSelections);
  const loading = useSelector(selectSelectionsLoading);
  const error = useSelector(selectSelectionsError);

  useEffect(() => {
    dispatch(initializeAuth());
    dispatch(fetchAllSelections());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/signin');
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.sidebar}>
      <div className={styles.personal}>
        <div className={styles.name}>
          {loading ? <Skeleton width={100} /> : username ? username : 'Гость'}
        </div>
        <div className={styles.icon} onClick={handleLogout}>
          {loading ? (
            <Skeleton circle width={50} height={50}/>
          ) : (
            <LogOutIcon width={25} height={25} className={styles.logout} />
          )}
        </div>
      </div>
      <div className={styles.list}>
        {loading
          ? Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className={styles.skeletonItem}>
                <Skeleton width={250} height={150} />
              </div>
            ))
          : selections &&
            selections.map((selection) => (
              <Link
                key={selection._id}
                className={styles.link}
                href={`/selections/${selection._id}`}
              >
                <Image
                  width={250}
                  height={150}
                  src={`/playlist${selection._id}.png`}
                  alt={selection.name}
                  quality={100}
                />
              </Link>
            ))}
      </div>
    </div>
  );
};

export default Sidebar;
