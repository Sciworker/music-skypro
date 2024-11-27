'use client';
import styles from "./page.module.css";
import Navbar from "@/components/Navbar/Navbar";
import MainBlock from "@/components/MainBlock/MainBlock";
import Sidebar from "@/components/Sidebar/Sidebar";


export default function Page() {
 

  return (
    <main className={styles.main}>
      <Navbar />
      <MainBlock />
      <Sidebar />
    </main>
  );
}
