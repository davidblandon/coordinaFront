export const getWeekDays = (date) => {
  const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
  
  const current = new Date(date);
  const first = current.getDate() - current.getDay() + 1; // Lundi
  
  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(current.setDate(first + i));
    weekDays.push({
      id: i,
      name: days[day.getDay()],
      number: day.getDate(),
      fullDate: day.toISOString().split('T')[0],
      date: day
    });
  }
  
  const firstDay = weekDays[0].date;
  const lastDay = weekDays[6].date;
  const weekDisplay = `${firstDay.getDate()} ${months[firstDay.getMonth()]} - ${lastDay.getDate()} ${months[lastDay.getMonth()]} ${lastDay.getFullYear()}`;
  
  return { weekDays, weekDisplay };
};

export const getTodayIndex = (weekDays) => {
  const today = new Date().toISOString().split('T')[0];
  return weekDays.findIndex(day => day.fullDate === today);
};