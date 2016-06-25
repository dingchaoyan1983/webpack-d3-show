function random(width = 500) {
  return Math.floor(Math.random() * width);
}

function generateRandomArray(count = 10, width = 500) {
  const arr = [];

  for (let i = 0; i < count; i++) {
    arr.push(random(width));
  }

  return arr;
}

function generateRandomPoints(count = 10, width = 500, height = 500) {
  const arr = [];

  for (let i = 0; i < count; i++) {
    arr.push({
      x: random(width),
      y: random(height)
    });
  }

  return arr;
}

export {
  random,
  generateRandomArray,
  generateRandomPoints
};
