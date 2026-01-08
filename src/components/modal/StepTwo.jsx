import React from 'react';
import { styles } from '../../styles/modalStyles';

export const StepTwo = ({ formData, onChange }) => {
  const calculateEndTime = () => {
    const startHour = parseInt(formData.startHour);
    const startMinute = parseInt(formData.startMinute);
    const totalMinutes = startHour * 60 + startMinute + formData.duration;
    const endHour = Math.floor(totalMinutes / 60) % 24;
    const endMinute = totalMinutes % 60;
    return `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;
  };

  return (
    <div className={styles.body}>
      <div className={styles.formGroup}>
        <label className={styles.label}>Nom de la réunion *</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => onChange({ ...formData, title: e.target.value })}
          placeholder="ex: Réunion d'équipe, Point projet..."
          className={styles.input}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => onChange({ ...formData, description: e.target.value })}
          placeholder="Détails, ordre du jour, notes..."
          className={styles.textarea}
          rows={6}
        />
      </div>

      <div className="text-sm text-gray-500 mt-4 space-y-1">
        <p className="mb-2"><strong>Récapitulatif :</strong></p>
        <p>🕐 Horaire : {formData.startHour}:{formData.startMinute} - {calculateEndTime()}</p>
        <p>⏱️ Durée : {formData.duration} minutes</p>
        <p>📍 Lieu : {formData.location || 'Non spécifié'}</p>
        <p>👥 Participants : {formData.participants.length} personne(s)</p>
      </div>
    </div>
  );
};