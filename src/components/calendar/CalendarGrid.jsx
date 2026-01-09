import React from 'react';
import { DayHeader } from './DayHeader';
import { TimeSlot } from './TimeSlot';
import { styles } from '../../styles/calendarStyles';
import { 
  isTimeInAvailability, 
  findAppointmentStartingAt, 
  isSlotOccupiedByAppointment, 
  getAppointmentHeight 
} from '../../utils/calendarUtils';

const HOURS = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00'
];

export const CalendarGrid = ({ days, todayIndex, availability, appointments }) => {
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
          
          {days.map((day, dayIndex) => {
            const slotKey = `${day.fullDate}-${hour}`;
            
            // Chercher si un rendez-vous COMMENCE à cette heure
            const appointmentStarting = findAppointmentStartingAt(day.fullDate, hour, appointments);
            
            if (appointmentStarting) {
              const heightInSlots = getAppointmentHeight(appointmentStarting);
              
              return (
                <div key={slotKey} className={styles.dayColumn}>
                  <TimeSlot 
                    isToday={dayIndex === todayIndex}
                    isAvailable={false}
                    appointment={{ ...appointmentStarting, heightInSlots }}
                    onClick={() => {}}
                  />
                </div>
              );
            }
            
            // Vérifier si ce slot est occupé par un rendez-vous
            const isOccupied = isSlotOccupiedByAppointment(day.fullDate, hour, appointments);
            
            if (isOccupied) {
              return <div key={slotKey} className={styles.dayColumn} />;
            }
            
            // Slot normal - NON CLIQUABLE
            const isAvailable = isTimeInAvailability(day.name, hour, availability);
            
            return (
              <div key={slotKey} className={styles.dayColumn}>
                <TimeSlot 
                  isToday={dayIndex === todayIndex}
                  isAvailable={isAvailable}
                  appointment={null}
                  onClick={() => {}} // Pas de clic
                />
              </div>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
};