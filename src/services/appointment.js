import { API_CONFIG } from './config';

export const appointmentAPI = {
  // Proposer un rendez-vous et obtenir les créneaux possibles
  proposeAppointment: async (proposalData) => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/appointment/propose`, {
        method: 'POST',
        headers: API_CONFIG.HEADERS,
        body: JSON.stringify(proposalData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur lors de la proposition de rendez-vous:', error);
      throw error;
    }
  },

  // Confirmer un rendez-vous
  confirmAppointment: async (appointmentData) => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/appointment/confirm`, {
        method: 'POST',
        headers: API_CONFIG.HEADERS,
        body: JSON.stringify(appointmentData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur lors de la confirmation de rendez-vous:', error);
      throw error;
    }
  }
};