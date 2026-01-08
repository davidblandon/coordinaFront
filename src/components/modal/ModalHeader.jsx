import React from 'react';
import { X } from 'lucide-react';
import { styles } from '../../styles/modalStyles';

export const ModalHeader = ({ step, onClose }) => (
  <div className={styles.header}>
    <div className={styles.headerTop}>
      <h2 className={styles.title}>Créer un rendez-vous</h2>
      <button onClick={onClose} className={styles.closeButton}>
        <X className="w-6 h-6" />
      </button>
    </div>
    <div className={styles.stepIndicator}>
      <div className={step === 1 ? styles.stepActive : styles.step} />
      <div className={step === 2 ? styles.stepActive : styles.step} />
    </div>
  </div>
);