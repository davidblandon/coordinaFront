import React from 'react';
import { styles } from '../styles/indexStyles';

export const SecondaryButton = ({ onClick, icon: Icon, text }) => (
  <button onClick={onClick} className={styles.secondaryButton}>
    <div className={styles.buttonContent}>
      <Icon className={styles.buttonIcon} />
      <span className={styles.buttonText}>{text}</span>
    </div>
  </button>
);
