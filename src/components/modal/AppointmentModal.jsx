import React, { useState, useEffect } from 'react';
import { ModalHeader } from './ModalHeader';
import { StepOne } from './StepOne';
import { StepTwo } from './StepTwo';
import { styles } from '../../styles/modalStyles';

export const AppointmentModal = ({ isOpen, onClose, dateInfo, initialHour, onSubmit }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    participants: [],
    startHour: '08',
    startMinute: '00',
    duration: 60
  });

  // Mettre à jour l'heure initiale quand le modal s'ouvre
  useEffect(() => {
    if (isOpen && initialHour) {
      const [hour] = initialHour.split(':');
      setFormData(prev => ({
        ...prev,
        startHour: hour.padStart(2, '0'),
        startMinute: '00'
      }));
    }
  }, [isOpen, initialHour]);

  if (!isOpen) return null;

  const handleNext = () => {
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = () => {
    if (!formData.title.trim()) {
      alert('Le nom de la réunion est obligatoire');
      return;
    }
    onSubmit(formData);
    handleClose();
  };

  const handleClose = () => {
    setStep(1);
    setFormData({
      title: '',
      description: '',
      location: '',
      participants: [],
      startHour: '08',
      startMinute: '00',
      duration: 60
    });
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <ModalHeader step={step} onClose={handleClose} />

        {step === 1 ? (
          <StepOne
            formData={formData}
            onChange={setFormData}
            dateInfo={dateInfo}
            initialHour={initialHour}
          />
        ) : (
          <StepTwo formData={formData} onChange={setFormData} />
        )}

        <div className={styles.footer}>
          {step === 1 ? (
            <>
              <button onClick={handleClose} className={styles.buttonSecondary}>
                Annuler
              </button>
              <button onClick={handleNext} className={styles.buttonPrimary}>
                Suivant
              </button>
            </>
          ) : (
            <>
              <button onClick={handleBack} className={styles.buttonSecondary}>
                Retour
              </button>
              <button onClick={handleSubmit} className={styles.buttonPrimary}>
                Créer le rendez-vous
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};