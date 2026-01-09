import React, { createContext, useContext, useState, useEffect } from 'react';
import { userAPI } from '../services/user';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Charger tous les utilisateurs au démarrage
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const usersData = await userAPI.getAllUsers();
      setUsers(usersData);
      
      // Sélectionner le premier utilisateur par défaut
      if (usersData.length > 0 && !currentUser) {
        setCurrentUser(usersData[0]);
      }
    } catch (err) {
      setError(err.message);
      console.error('Erreur lors du chargement des utilisateurs:', err);
    } finally {
      setLoading(false);
    }
  };

  const switchUser = (userId) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setCurrentUser(user);
      console.log('Utilisateur changé:', user.name);
    }
  };

  const value = {
    currentUser,
    users,
    loading,
    error,
    switchUser,
    refreshUsers: loadUsers
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser doit être utilisé dans un UserProvider');
  }
  return context;
};
