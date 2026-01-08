import React, { useState } from 'react';
import { CalendarHeader } from '../components/calendar/CalendarHeader';
import { CalendarGrid } from '../components/calendar/CalendarGrid';
import { AppointmentModal } from '../components/modal/AppointmentModal';
import { getWeekDays, getTodayIndex } from '../utils/dateUtils';
import { styles } from '../styles/calendarStyles';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [appointments, setAppointments] = useState([]);
  
  const { weekDays, weekDisplay } = getWeekDays(currentDate);
  const todayIndex = getTodayIndex(weekDays);

  const handlePrevWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const handleBack = () => {
    console.log('Retour à l\'accueil');
  };

  const handleSlotClick = (day, hour) => {
    setSelectedSlot({ day, hour });
    setIsModalOpen(true);
  };

  const handleCreateAppointment = (formData) => {
    const newAppointment = {
      id: Date.now(),
      ...formData,
      date: selectedSlot.day.fullDate,
      startTime: `${formData.startHour}:${formData.startMinute}`
    };
    
    setAppointments([...appointments, newAppointment]);
    console.log('Rendez-vous créé:', newAppointment);
  };

  const getDateInfo = () => {
    if (!selectedSlot) return '';
    const { day } = selectedSlot;
    const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 
                    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    const date = new Date(day.fullDate);
    return `${day.name} ${day.number} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  return (
    <div className={styles.container}>
      <CalendarHeader
        weekDisplay={weekDisplay}
        onPrevWeek={handlePrevWeek}
        onNextWeek={handleNextWeek}
        onBack={handleBack}
      />
      
      <div className={styles.mainContent}>
        <CalendarGrid 
          days={weekDays} 
          todayIndex={todayIndex}
          onSlotClick={handleSlotClick}
        />
      </div>

      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        dateInfo={getDateInfo()}
        initialHour={selectedSlot?.hour}
        onSubmit={handleCreateAppointment}
      />
    </div>
  );
}