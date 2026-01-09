// Mapper les jours français vers anglais
const DAY_MAP_FR_TO_EN = {
  'Lun': 'monday',
  'Mar': 'tuesday',
  'Mer': 'wednesday',
  'Jeu': 'thursday',
  'Ven': 'friday',
  'Sam': 'saturday',
  'Dim': 'sunday'
};

// Obtenir le nom du jour en anglais
export const getDayNameInEnglish = (dayNameFr) => {
  return DAY_MAP_FR_TO_EN[dayNameFr] || 'monday';
};

// Calculer le numéro de semaine
export const getWeekNumber = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return weekNo;
};

// Formater l'heure pour l'API (HH:MM:SS)
export const formatTimeForAPI = (hour, minute) => {
  return `${hour}:${minute}:00`;
};

// Calculer l'heure de fin
export const calculateEndTime = (startHour, startMinute, durationMinutes) => {
  const totalMinutes = parseInt(startHour) * 60 + parseInt(startMinute) + durationMinutes;
  const endHour = Math.floor(totalMinutes / 60);
  const endMinute = totalMinutes % 60;
  return {
    hour: endHour.toString().padStart(2, '0'),
    minute: endMinute.toString().padStart(2, '0')
  };
};