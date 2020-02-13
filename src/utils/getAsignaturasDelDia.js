const getAsignaturasDelDia = async () => {
  const response = [
    {
      id: 1,
      nombre: 'Matemática Superior',
      aula: '104',
      sede: 'Campus',
      horaC: '1600',
      horaT: '1800',
    },
    {
      id: 2,
      nombre: 'Física 2',
      aula: '505',
      sede: 'Medrano',
      horaC: '0300',
      horaT: '0330',
    },
  ];
  await new Promise(resolve => setTimeout(resolve, 1000));
  return response;
};

export default getAsignaturasDelDia;
