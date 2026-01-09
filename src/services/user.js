import { API_CONFIG } from './config';

export const userAPI = {
  // Récupérer tous les utilisateurs
  getAllUsers: async () => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/user/all`, {
        method: 'GET',
        headers: API_CONFIG.HEADERS,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      throw error;
    }
  },

  // Récupérer les rendez-vous d'un utilisateur
  getUserAppointments: async (userId) => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/user/${userId}/appointments`, {
        method: 'GET',
        headers: API_CONFIG.HEADERS,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des rendez-vous:', error);
      throw error;
    }
  }
};