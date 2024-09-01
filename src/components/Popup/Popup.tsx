'use client'

import React, { useRef, useEffect } from 'react';
import styles from './popup.module.css';
import { PopupProps } from '../../types/types';


const Popup: React.FC<PopupProps> = ({ content, onClose }) => {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, [onClose]);

  return (
    <div className={styles.popup} ref={popupRef}>
      <div className={styles.popupContent}>
        {Array.isArray(content) ? (
          content.map((item, index) => (
            <div key={index} className={styles.popupItem}>
              {item}
            </div>
          ))
        ) : (
          <div className={styles.popupItem}>{content}</div>
        )}
      </div>
    </div>
  );
};

export default Popup;
