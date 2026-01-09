import React from 'react';
import { styles } from '../../styles/calendarStyles';
import { normalizeTime } from '../../utils/calendarUtils';

export const TimeSlot = ({ isToday, isAvailable, appointment, onClick }) => {
  if (appointment) {
    const height = appointment.heightInSlots || 1;
    const heightInRem = height * 4;
    
    return (
      <div 
        style={{ 
          position: 'relative',
          height: '4rem' // Hauteur normale du slot
        }}
      >
        <div
          className={styles.appointment}
          style={{ 
            height: `${heightInRem}rem`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 20
          }}
        >
          {isToday && <div className={styles.todayIndicator} />}
          <div className={styles.appointmentTitle}>{appointment.title}</div>
          <div className={styles.appointmentTime}>
            {normalizeTime(appointment.start)} - {normalizeTime(appointment.end)}
          </div>
          {appointment.location && (
            <div className={styles.appointmentTime}>📍 {appointment.location}</div>
          )}
        </div>
      </div>
    );
  }

  const slotClass = isAvailable ? styles.timeSlotAvailable : styles.timeSlotUnavailable;

  return (
    <div className={slotClass} onClick={isAvailable ? onClick : undefined}>
      {isToday && <div className={styles.todayIndicator} />}
    </div>
  );
};