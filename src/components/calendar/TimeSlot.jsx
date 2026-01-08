import React from 'react';
import { styles } from '../../styles/calendarStyles';

export const TimeSlot = ({ isToday, onClick }) => (
  <div className={styles.timeSlot} onClick={onClick}>
    {isToday && <div className={styles.todayIndicator} />}
  </div>
);