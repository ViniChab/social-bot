exports.randomTimeout = (max = 10_000, min = 2_000) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
