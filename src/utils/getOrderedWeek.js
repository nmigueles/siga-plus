export const today = new Date().getDay();

export const WeekFuture = ['Hoy', 'Mañana'];

export const WeekDays = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miercoles',
  'Jueves',
  'Viernes',
  'Sabado',
];

export const getOrderedWeek = () => {
  const weekOrdered = [];
  for (let i = 0; i < 7; i += 1) {
    weekOrdered.push((today + i) % 7);
  }
  return weekOrdered;
};

export const Week = getOrderedWeek();
