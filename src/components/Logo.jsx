import React from 'react';
import { Calendar } from 'lucide-react';
import { styles } from '../styles/indexStyles';

export const Logo = () => (
  <div className={styles.logoCircle}>
    <Calendar className={styles.logoIcon} />
  </div>
);