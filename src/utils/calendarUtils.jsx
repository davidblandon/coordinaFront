// Mapper les jours de la semaine
const DAY_MAP = {
  'Lun': 'monday',
  'Mar': 'tuesday',
  'Mer': 'wednesday',
  'Jeu': 'thursday',
  'Ven': 'friday',
  'Sam': 'saturday',
  'Dim': 'sunday'
};

// Normaliser le format d'heure (enlever les secondes)
export const normalizeTime = (time) => {
  if (!time) return '00:00';
  return time.substring(0, 5); // "09:00:00" → "09:00"
};

// Convertir heure en minutes
export const timeToMinutes = (time) => {
  const normalized = normalizeTime(time);
  const [hours, minutes] = normalized.split(':').map(Number);
  return hours * 60 + (minutes || 0);
};

// Vérifier si un créneau est dans la disponibilité
export const isTimeInAvailability = (dayName, time, availability) => {
  const dayKey = DAY_MAP[dayName];
  if (!dayKey || !availability[dayKey]) return false;
  
  const slots = availability[dayKey];
  const timeMinutes = timeToMinutes(time);
  
  return slots.some(slot => {
    const startMinutes = timeToMinutes(slot.start);
    const endMinutes = timeToMinutes(slot.end);
    return timeMinutes >= startMinutes && timeMinutes < endMinutes;
  });
};

// Trouver le rendez-vous qui commence dans un slot donné
export const findAppointmentStartingAt = (date, hour, appointments) => {
  const hourNormalized = normalizeTime(hour);
  
  return appointments.find(apt => {
    if (apt.date !== date) return false;
    const aptStartNormalized = normalizeTime(apt.start);
    return aptStartNormalized === hourNormalized;
  });
};

// Vérifier si un slot est occupé par un rendez-vous
export const isSlotOccupiedByAppointment = (date, hour, appointments) => {
  const slotMinutes = timeToMinutes(hour);
  
  return appointments.some(apt => {
    if (apt.date !== date) return false;
    
    const startMinutes = timeToMinutes(apt.start);
    const endMinutes = timeToMinutes(apt.end);
    
    return slotMinutes >= startMinutes && slotMinutes < endMinutes;
  });
};

// Calculer la hauteur d'un rendez-vous en slots de 1 heure
export const getAppointmentHeight = (appointment) => {
  const startMinutes = timeToMinutes(appointment.start);
  const endMinutes = timeToMinutes(appointment.end);
  const durationMinutes = endMinutes - startMinutes;
  return durationMinutes / 30; // En demi-heures (30 min = 1 slot)
};