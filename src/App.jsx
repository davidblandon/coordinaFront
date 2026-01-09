import React, { useState } from 'react';
import { UserProvider } from './context/UserContext';
import Index from './pages/Index';
import Calendar from './pages/Calendar';

function App() {
  const [currentPage, setCurrentPage] = useState('index'); // 'index' ou 'calendar'

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  return (
    <UserProvider>
      {currentPage === 'index' && <Index onNavigate={navigateTo} />}
      {currentPage === 'calendar' && <Calendar onNavigate={navigateTo} />}
    </UserProvider>
  );
}

export default App;