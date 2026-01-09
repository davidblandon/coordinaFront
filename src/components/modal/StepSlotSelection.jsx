import React from 'react';
import { Calendar } from 'lucide-react';
import { styles } from '../../styles/modalStyles';

const formatSlotDisplay = (slot) => {
  const date = new Date(slot.date);
  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  const dateStr = date.toLocaleDateString('fr-FR', options);
  return `${dateStr} • ${slot.start} - ${slot.end}`;
};

export const StepSlotSelection = ({ slots, selectedSlot, onSelectSlot, loading, error }) => {
  if (loading) {
    return (
      <div className={styles.body}>
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mb-4"></div>
          <p className="text-gray-600">Recherche des créneaux disponibles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.body}>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-800 font-medium mb-2">Aucun créneau disponible</p>
          <p className="text-red-600 text-sm">
            Aucun créneau ne correspond à vos critères. Veuillez revenir en arrière et modifier la durée ou les participants.
          </p>
        </div>
      </div>
    );
  }

  if (!slots || slots.length === 0) {
    return (
      <div className={styles.body}>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <p className="text-yellow-800">Aucun créneau trouvé</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.body}>
      <p className="text-sm text-gray-600 mb-4">
        {slots.length} créneau{slots.length > 1 ? 'x' : ''} disponible{slots.length > 1 ? 's' : ''}
      </p>
      <div className="max-h-96 overflow-y-auto space-y-2">
        {slots.map((slot, index) => (
          <button
            key={`${slot.date}-${slot.start}-${index}`}
            onClick={() => onSelectSlot(slot)}
            className={`w-full text-left px-4 py-4 border-2 rounded-lg transition-all hover:border-black ${
              selectedSlot === slot
                ? 'border-black bg-gray-50'
                : 'border-gray-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-600" />
              <span className="font-medium">{formatSlotDisplay(slot)}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};