import React, { useRef, useEffect } from 'react';
import styles from './popup.module.css';

export interface PopupProps {
  content: string | string[];
  onClose: () => void;
  onSelect: (item: string) => void;
  activeItems: string[];
}

const Popup: React.FC<PopupProps> = ({ content, onClose, onSelect, activeItems }) => {
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
            <div
              key={index}
              className={`${styles.popupItem} ${
                activeItems.includes(item.toLowerCase()) ? styles.active : ''
              }`}
              onClick={() => {
                onSelect(item);
                onClose();
              }}
            >
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
