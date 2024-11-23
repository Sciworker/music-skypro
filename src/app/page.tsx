'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import styles from "./page.module.css";
import Navbar from "@/components/Navbar/Navbar";
import MainBlock from "@/components/MainBlock/MainBlock";
import Sidebar from "@/components/Sidebar/Sidebar";
import { RootState } from '../redux/store';
import { initializeAuth } from '../redux/auth/slice';

export default function Page() {
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(initializeAuth());
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.push('/signin');
    }
  }, [isLoggedIn, loading, router]);

  if (loading || !isLoggedIn) {
    return '';
  }

  return (
    <main className={styles.main}>
      <Navbar />
      <MainBlock />
      <Sidebar />
    </main>
  );
}
