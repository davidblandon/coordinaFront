import React, { useState } from 'react';
import { ModalHeader } from './ModalHeader';
import { StepOne } from './StepOne';
import { StepSlotSelection } from './StepSlotSelection';
import { StepThree } from './StepThree';
import { useUser } from '../../context/UserContext';
import { appointmentAPI } from '../../services/appointment';
import { getWeekNumber } from '../../utils/appointmentUtils';
import { styles } from '../../styles/modalStyles';

export const AppointmentModal = ({ isOpen, onClose, onSubmit }) => {
  const { currentUser } = useUser();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    participants: [],
    participantNames: [],
    duration: 60
  });

  if (!isOpen) return null;

  const handleClose = () => {
    setStep(1);
    setFormData({
      title: '',
      description: '',
      location: '',
      participants: [],
      participantNames: [],
      duration: 60
    });
    setAvailableSlots([]);
    setSelectedSlot(null);
    setSlotsError(false);
    onClose();
  };

  const handleNextFromStepOne = async () => {
    if (!formData.title.trim()) {
      alert('Le nom de la réunion est obligatoire');
      return;
    }

    try {
      setSlotsLoading(true);
      setSlotsError(false);
      setStep(2);

      // Calculer la semaine actuelle
      const today = new Date();
      const currentWeek = getWeekNumber(today.toISOString().split('T')[0]);

      // Appel API /appointment/propose pour obtenir les créneaux possibles
      // Le host (créateur) doit être le premier dans participants_id
      const proposalData = {
        title: formData.title,
        participants_id: [currentUser.id, ...formData.participants], // Host en premier
        week: currentWeek,
        duration_minutes: formData.duration,
        day: ["monday", "tuesday", "wednesday", "thursday", "friday"], // Tous les jours de la semaine
        location: formData.location || ""
      };

      console.log('Proposition:', proposalData);
      const response = await appointmentAPI.proposeAppointment(proposalData);
      console.log('Réponse API propose:', response);
      
      // Format: { available_slots: { monday: [...], tuesday: [...], ... } }
      const allSlots = [];
      
      if (response.available_slots) {
        // Combiner tous les créneaux de tous les jours
        Object.keys(response.available_slots).forEach(day => {
          const daySlots = response.available_slots[day];
          if (Array.isArray(daySlots)) {
            allSlots.push(...daySlots);
          }
        });
      }
      
      console.log('Créneaux disponibles:', allSlots.length);
      
      if (allSlots.length > 0) {
        setAvailableSlots(allSlots);
      } else {
        setSlotsError(true);
        setAvailableSlots([]);
      }
    } catch (error) {
      console.error('Erreur lors de la proposition:', error);
      setSlotsError(true);
      setAvailableSlots([]);
    } finally {
      setSlotsLoading(false);
    }
  };

  const handleNextFromStepTwo = () => {
    if (!selectedSlot) {
      alert('Veuillez sélectionner un créneau');
      return;
    }
    setStep(3);
  };

  const handleSubmit = async () => {
    if (!currentUser || !selectedSlot) {
      alert('Erreur: informations manquantes');
      return;
    }

    try {
      setLoading(true);

      // Construire les données pour confirm selon le format attendu
      const confirmData = {
        id: selectedSlot.id || crypto.randomUUID(), // Ajouter un ID si pas présent
        title: selectedSlot.title,
        date: selectedSlot.date,
        week: getWeekNumber(selectedSlot.date),
        start: selectedSlot.start,
        end: selectedSlot.end,
        host_id: selectedSlot.host_id,
        participants_id: selectedSlot.participants_id,
        location: formData.location || selectedSlot.location || '',
      };

      console.log('Slot sélectionné:', selectedSlot);
      console.log('Données de confirmation:', confirmData);
      const confirmResponse = await appointmentAPI.confirmAppointment(confirmData);
      console.log('Réponse confirmation:', confirmResponse);

      alert('Rendez-vous créé avec succès !');
      onSubmit();
      handleClose();
    } catch (error) {
      console.error('Erreur lors de la confirmation:', error);
      alert('Erreur lors de la création du rendez-vous');
    } finally {
      setLoading(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && !loading) {
      handleClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <ModalHeader step={step} onClose={handleClose} />

        {step === 1 && (
          <StepOne formData={formData} onChange={setFormData} />
        )}

        {step === 2 && (
          <StepSlotSelection
            slots={availableSlots}
            selectedSlot={selectedSlot}
            onSelectSlot={setSelectedSlot}
            loading={slotsLoading}
            error={slotsError}
          />
        )}

        {step === 3 && (
          <StepThree
            formData={formData}
            onChange={setFormData}
            selectedSlot={selectedSlot}
          />
        )}

        <div className={styles.footer}>
          {step === 1 ? (
            <>
              <button onClick={handleClose} className={styles.buttonSecondary} disabled={loading}>
                Annuler
              </button>
              <button onClick={handleNextFromStepOne} className={styles.buttonPrimary} disabled={loading}>
                Suivant
              </button>
            </>
          ) : step === 2 ? (
            <>
              <button onClick={() => setStep(1)} className={styles.buttonSecondary} disabled={loading || slotsLoading}>
                Retour
              </button>
              <button 
                onClick={handleNextFromStepTwo} 
                className={styles.buttonPrimary} 
                disabled={loading || slotsLoading || !selectedSlot}
              >
                Suivant
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setStep(2)} className={styles.buttonSecondary} disabled={loading}>
                Retour
              </button>
              <button onClick={handleSubmit} className={styles.buttonPrimary} disabled={loading}>
                {loading ? 'Création...' : 'Créer le rendez-vous'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};