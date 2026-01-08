import React from 'react';
import { Calendar, Plus } from 'lucide-react';
import { Header } from '../components/Header';
import { PrimaryButton } from '../components/PrimaryButton';
import { SecondaryButton } from '../components/SecondaryButton';
import { Footer } from '../components/Footer';
import { handleViewSchedule, handleCreateAppointment } from '../handlers/indexHandlers';
import { styles } from '../styles/indexStyles';
import { useNavigate } from 'react-router-dom';

export default function Index() {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Header />
        
        <div className={styles.buttonsContainer}>
          <PrimaryButton
            onClick={() => navigate("/calendar")}
            icon={Calendar}
            text="Voir mon emploi du temps"
          />
        </div>

        <Footer />
      </div>
    </div>
  );
}