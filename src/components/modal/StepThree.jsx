import React from 'react';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { styles } from '../../styles/modalStyles';

const formatSlotDisplay = (slot) => {
  if (!slot) return 'Créneau non sélectionné';
  const date = new Date(slot.date);
  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  const dateStr = date.toLocaleDateString('fr-FR', options);
  return `${dateStr} • ${slot.start} - ${slot.end}`;
};

export const StepThree = ({ formData, onChange, selectedSlot }) => {
  return (
    <div className={styles.body}>
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


      <div className="bg-gray-50 rounded-lg p-4 mt-4 space-y-2 text-sm">
        <p className="font-medium mb-3">Récapitulatif :</p>
        <div className="flex items-start gap-2">
          <Calendar className="w-4 h-4 mt-0.5 text-gray-600" />
          <span>{formatSlotDisplay(selectedSlot)}</span>
        </div>
        <div className="flex items-start gap-2">
          <Clock className="w-4 h-4 mt-0.5 text-gray-600" />
          <span>{formData.duration} minutes</span>
        </div>
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 mt-0.5 text-gray-600" />
          <span>{formData.location || 'Non spécifié'}</span>
        </div>
        <div className="flex items-start gap-2">
          <Users className="w-4 h-4 mt-0.5 text-gray-600" />
          <span>{formData.participants.length + 1} personne(s)</span>
        </div>
      </div>
    </div>
  );
};