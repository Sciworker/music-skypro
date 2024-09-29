'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../redux/store';
import styles from "../../page.module.css";
import Navbar from "@/components/Navbar/Navbar";
import MainBlock from "@/components/MainBlock/MainBlock";
import Sidebar from "@/components/Sidebar/Sidebar";
import { RootState } from '../../../redux/store';
import { initializeAuth } from '../../../redux/auth/slice';
import { fetchSelectionById } from '../../../redux/selections/asyncActions';
import { selectCurrentPlaylist } from '@/redux/playlist/selectors';

export default function Page() {
  const router = useRouter();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const currentPlaylist = useSelector(selectCurrentPlaylist);
  const [loading, setLoading] = useState(true);
  const [selection, setSelection] = useState(null);

  useEffect(() => {
    dispatch(initializeAuth());
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.push('/signin');
    }
  }, [isLoggedIn, loading, router]);

  useEffect(() => {
    if (id) {
      dispatch(fetchSelectionById(Number(id))).then((response) => {
        setSelection(response.payload.data);
      });
    }
  }, [id, dispatch]);


  if (loading || !isLoggedIn) {
    return <p>Загрузка...</p>;
  }

  return (
    <main className={styles.main}>
      <Navbar />
      <MainBlock selection={selection} />
      <Sidebar />
    </main>
  );
}
