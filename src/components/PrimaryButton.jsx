import React from 'react';
import { styles } from '../styles/indexStyles';

export const PrimaryButton = ({ onClick, icon: Icon, text }) => (
  <button onClick={onClick} className={styles.primaryButton}>
    <div className={styles.buttonContent}>
      <Icon className={styles.buttonIcon} />
      <span className={styles.buttonText}>{text}</span>
    </div>
    <div className={styles.hoverOverlay} />
  </button>
);