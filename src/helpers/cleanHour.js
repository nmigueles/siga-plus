const cleanHour = hour => {
  const hourPlain = hour.replace(':', '');
  if (hourPlain.length === 3) return `0${hourPlain}`;
  return hourPlain;
};

module.exports = cleanHour;
