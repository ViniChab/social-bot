exports.randomTimeout = (max = 12_000, min = 6_000) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
