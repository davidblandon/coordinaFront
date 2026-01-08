import React from 'react';
import { DayHeader } from './DayHeader';
import { TimeSlot } from './TimeSlot';
import { styles } from '../../styles/calendarStyles';

const HOURS = [
  '08:00', '09:00', '10:00', '11:00', '12:00', 
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
];

export const CalendarGrid = ({ days, todayIndex, onSlotClick }) => {
  return (
    <div className={styles.calendarGrid}>
      <div className={styles.timeColumn}></div>
      
      {days.map((day, index) => (
        <div key={day.id} className={styles.dayColumn}>
          <DayHeader day={day} isToday={index === todayIndex} />
        </div>
      ))}
      
      {HOURS.map((hour) => (
        <React.Fragment key={hour}>
          <div className={styles.timeColumn}>
            <div className={styles.timeCell}>{hour}</div>
          </div>
          
          {days.map((day, dayIndex) => (
            <div key={`${day.id}-${hour}`} className={styles.dayColumn}>
              <TimeSlot 
                isToday={dayIndex === todayIndex}
                onClick={() => onSlotClick(day, hour)}
              />
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};