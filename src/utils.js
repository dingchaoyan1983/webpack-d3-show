import * as d3 from 'd3';

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

function generatePointsRandom(count = 10, width = 500, height = 500) {
  const arr = d3.range(0, width, Math.floor(width / count));
  return arr.map((x) => ({ x, y: generateRandom(height) }));
}

export {
  generateRandom,
  generateOneDimensionRandom,
  generatePointsRandom
};
