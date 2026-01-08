import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { styles } from '../../styles/modalStyles';

export const StepOne = ({ formData, onChange, dateInfo, initialHour }) => {
  const [participantInput, setParticipantInput] = useState('');

  const handleAddParticipant = () => {
    if (participantInput.trim()) {
      onChange({
        ...formData,
        participants: [...formData.participants, participantInput.trim()]
      });
      setParticipantInput('');
    }
  };

  const handleRemoveParticipant = (index) => {
    onChange({
      ...formData,
      participants: formData.participants.filter((_, i) => i !== index)
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddParticipant();
    }
  };

  // Générer les options d'heures (00-23)
  const hours = Array.from({ length: 24 }, (_, i) => 
    i.toString().padStart(2, '0')
  );
  
  // Générer les options de minutes (00-59)
  const minutes = Array.from({ length: 60 }, (_, i) => 
    i.toString().padStart(2, '0')
  );

  // Options de durée
  const durations = [
    { value: 15, label: '15 minutes' },
    { value: 30, label: '30 minutes' },
    { value: 45, label: '45 minutes' },
    { value: 60, label: '1 heure' },
    { value: 90, label: '1h 30min' },
    { value: 120, label: '2 heures' },
    { value: 180, label: '3 heures' }
  ];

  return (
    <div className={styles.body}>
      <div className={styles.dateTimeInfo}>
        📅 {dateInfo}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className={styles.formGroup}>
          <label className={styles.label}>Heure de début</label>
          <div className="flex gap-2">
            <select
              value={formData.startHour}
              onChange={(e) => onChange({ ...formData, startHour: e.target.value })}
              className={styles.input}
            >
              {hours.map(h => (
                <option key={h} value={h}>{h}</option>
              ))}
            </select>
            <select
              value={formData.startMinute}
              onChange={(e) => onChange({ ...formData, startMinute: e.target.value })}
              className={styles.input}
            >
              {minutes.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Durée</label>
          <select
            value={formData.duration}
            onChange={(e) => onChange({ ...formData, duration: parseInt(e.target.value) })}
            className={styles.input}
          >
            {durations.map(d => (
              <option key={d.value} value={d.value}>{d.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Lieu du rendez-vous</label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) => onChange({ ...formData, location: e.target.value })}
          placeholder="ex: Salle de réunion A, Bureau 301, Zoom..."
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Participants</label>
        <div className={styles.participantInput}>
          <input
            type="text"
            value={participantInput}
            onChange={(e) => setParticipantInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ajouter un participant"
            className={styles.input}
          />
          <button
            onClick={handleAddParticipant}
            className="px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        
        <div className="mt-3">
          {formData.participants.map((participant, index) => (
            <span key={index} className={styles.participantTag}>
              {participant}
              <button
                onClick={() => handleRemoveParticipant(index)}
                className={styles.removeButton}
              >
                <X className="w-4 h-4" />
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};