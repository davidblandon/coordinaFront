export const handleViewSchedule = (currentUser) => {
  console.log('Voir emploi du temps pour:', currentUser?.name, '(ID:', currentUser?.id, ')');
  // Navigation vers la page emploi du temps
};

export const handleCreateAppointment = (currentUser) => {
  console.log('Créer rendez-vous pour:', currentUser?.name, '(ID:', currentUser?.id, ')');
  // Navigation vers la page création
};