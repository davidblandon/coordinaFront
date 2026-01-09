import React, { useState, useEffect } from 'react';
import { CalendarHeader } from '../components/calendar/CalendarHeader';
import { CalendarGrid } from '../components/calendar/CalendarGrid';
import { AppointmentModal } from '../components/modal/AppointmentModal';
import { FloatingAddButton } from '../components/common/FloatingAddButton';
import { getWeekDays, getTodayIndex } from '../utils/dateUtils';
import { useUser } from '../context/UserContext';
import { userAPI } from '../services/user';
import { styles } from '../styles/calendarStyles';

export default function Calendar() {
  const { currentUser } = useUser();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const { weekDays, weekDisplay } = getWeekDays(currentDate);
  const todayIndex = getTodayIndex(weekDays);

  // Charger les rendez-vous quand l'utilisateur change
  useEffect(() => {
    if (currentUser) {
      loadAppointments();
    }
  }, [currentUser]);

  const loadAppointments = async () => {
    if (!currentUser) return;
    
    try {
      setLoading(true);
      const userAppointments = await userAPI.getUserAppointments(currentUser.id);
      setAppointments(userAppointments);
    } catch (error) {
      console.error('Erreur lors du chargement des rendez-vous:', error);
    } finally {
      setLoading(false);
    }
  };

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
    // Navigation vers index
  };

  const handleCreateAppointment = async () => {
    // Recharger les rendez-vous après création
    await loadAppointments();
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Chargement...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <CalendarHeader
        weekDisplay={weekDisplay}
        onPrevWeek={handlePrevWeek}
        onNextWeek={handleNextWeek}
        onBack={handleBack}
      />
      
      <div className={styles.mainContent}>
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Chargement des rendez-vous...</p>
          </div>
        ) : (
          <CalendarGrid 
            days={weekDays} 
            todayIndex={todayIndex}
            availability={currentUser.weekly_availability}
            appointments={appointments}
          />
        )}
      </div>

      <FloatingAddButton onClick={() => setIsModalOpen(true)} />

      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateAppointment}
      />
    </div>
  );
}