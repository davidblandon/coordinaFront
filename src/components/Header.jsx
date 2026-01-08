import React from 'react';
import { Logo } from './Logo';
import { styles } from '../styles/indexStyles';

export const Header = () => (
  <div className={styles.header}>
    <Logo />
    <h1 className={styles.title}>Coordina</h1>
    <p className={styles.subtitle}>Gérez vos rendez-vous d'entreprise</p>
  </div>
);