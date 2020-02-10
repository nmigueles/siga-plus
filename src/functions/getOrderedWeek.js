/**
 * @returns {Number}
 */
export const today = new Date().getDay();

/**
 * Devuelve la semana ordenda segun el dia que es.
 * Por ejemplo, si es Martes ( indice 2, ya que el 0 es el domingo, 1 lunes, etc...)
 * entonces devuelve [2,3,4,5,6,0,1]
 * @returns {Number[]}
 */
export const getOrderedWeek = () => {
  const weekOrdered = [];
  for (let i = 0; i < 7; i += 1) {
    weekOrdered.push((today + i) % 7);
  }
  return weekOrdered;
};

export const WeekDays = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miercoles',
  'Jueves',
  'Viernes',
  'Sabado',
];

export const WeekFuture = ['Hoy', 'Mañana'];

export const Week = getOrderedWeek();
