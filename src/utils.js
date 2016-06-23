function generateRandom(width = 500) {
  return Math.floor(Math.random() * width);
}

function generateOneDimensionRandom(count = 10, width = 500) {
  const arr = [];

  for (let i = 0; i < count; i++) {
    arr.push(generateRandom(width));
  }

  return arr;
}

export {
  generateRandom,
  generateOneDimensionRandom
};
