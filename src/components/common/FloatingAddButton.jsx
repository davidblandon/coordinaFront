import React from 'react';
import { Plus } from 'lucide-react';

export const FloatingAddButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="fixed bottom-8 right-8 w-14 h-14 bg-black text-white rounded-full shadow-lg hover:bg-gray-800 transition-all hover:scale-110 flex items-center justify-center z-50"
    aria-label="Créer un rendez-vous"
  >
    <Plus className="w-6 h-6" />
  </button>
);