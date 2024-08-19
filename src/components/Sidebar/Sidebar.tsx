import React from 'react'
import styles from './sidebar.module.css'
import LogOutIcon from '../../../public/icon/logout.svg';
import Image from 'next/image';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}> 
      <div className={styles.personal}>
        <div className={styles.name}>Sergey.Ivanov</div>
        <div className={styles.icon}><LogOutIcon width={25} height={25} className={styles.logout}/></div>
      </div>
    <div className={styles.list}>
        <Link className={styles.link} href='#'>
            <Image width={250} height={150} src='/playlist01.png' alt='playlist' quality={100}></Image>
        </Link>
        <Link className={styles.link} href='#'>
            <Image width={250} height={150} src='/playlist02.png' alt='playlist' quality={100}></Image>
        </Link>
        <Link className={styles.link} href='#'>
            <Image width={250} height={150} src='/playlist03.png' alt='playlist' quality={100}></Image>
        </Link>
    </div>
    </div>
  )
}

export default Sidebar
