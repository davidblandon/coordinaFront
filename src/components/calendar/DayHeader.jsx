import React from 'react';
import { styles } from '../../styles/calendarStyles';

export const DayHeader = ({ day, isToday }) => (
  <div className={styles.dayHeader}>
    <span className={styles.dayName}>{day.name}</span>
    <span className={isToday ? styles.dayNumberToday : styles.dayNumber}>
      {day.number}
    </span>
  </div>
);