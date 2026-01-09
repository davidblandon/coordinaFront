import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { styles } from '../../styles/modalStyles';
import { useUser } from '../../context/UserContext';

export const StepOne = ({ formData, onChange }) => {
  const { users, currentUser } = useUser();
  const [participantSelect, setParticipantSelect] = useState('');

  // Filtrer les utilisateurs (exclure l'utilisateur actuel)
  const availableUsers = users.filter(u => u.id !== currentUser?.id);

  const handleAddParticipant = () => {
    if (participantSelect && !formData.participants.includes(participantSelect)) {
      const selectedUser = users.find(u => u.id === participantSelect);
      onChange({
        ...formData,
        participants: [...formData.participants, participantSelect],
        participantNames: [...formData.participantNames, selectedUser?.name || '']
      });
      setParticipantSelect('');
    }
  };

  const handleRemoveParticipant = (index) => {
    onChange({
      ...formData,
      participants: formData.participants.filter((_, i) => i !== index),
      participantNames: formData.participantNames.filter((_, i) => i !== index)
    });
  };

  // Options de durée
  const durations = [
    { value: 30, label: '30 minutes' },
    { value: 60, label: '1 heure' },
    { value: 90, label: '1h 30min' },
    { value: 120, label: '2 heures' },
    { value: 180, label: '3 heures' }
  ];

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
        <label className={styles.label}>Durée *</label>
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

      <div className={styles.formGroup}>
        <label className={styles.label}>Participants</label>
        <div className={styles.participantInput}>
          <select
            value={participantSelect}
            onChange={(e) => setParticipantSelect(e.target.value)}
            className={styles.input}
          >
            <option value="">Sélectionner un participant</option>
            {availableUsers.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddParticipant}
            className="px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            disabled={!participantSelect}
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        
        <div className="mt-3">
          {formData.participantNames.map((name, index) => (
            <span key={index} className={styles.participantTag}>
              {name}
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