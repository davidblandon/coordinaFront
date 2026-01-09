import React from 'react';
import { Calendar, Plus } from 'lucide-react';
import { Header } from '../components/Header';
import { PrimaryButton } from '../components/PrimaryButton';
import { SecondaryButton } from '../components/SecondaryButton';
import { Footer } from '../components/Footer';
import { UserSwitcher } from '../components/user/UserSwitcher';
import { useUser } from '../context/UserContext';
import { styles } from '../styles/indexStyles';

export default function Index({ onNavigate }) {
  const { currentUser } = useUser();

  const handleViewSchedule = () => {
    console.log('Voir emploi du temps pour:', currentUser?.name);
    onNavigate('calendar');
  };

  const handleCreateAppointment = () => {
    console.log('Créer rendez-vous pour:', currentUser?.name);
    onNavigate('calendar');
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* UserSwitcher en haut à droite */}
        <div className="absolute top-6 right-6">
          <UserSwitcher />
        </div>

        <Header />
        
        <div className={styles.buttonsContainer}>
          <PrimaryButton
            onClick={handleViewSchedule}
            icon={Calendar}
            text="Voir mon emploi du temps"
          />
          <SecondaryButton
            onClick={handleCreateAppointment}
            icon={Plus}
            text="Créer un rendez-vous"
          />
        </div>

        <Footer />
      </div>
    </div>
  );
}