exports.randomBoolean = (percentage) => {
  const random = Math.floor(Math.random() * 101);
  return random <= percentage;
};
