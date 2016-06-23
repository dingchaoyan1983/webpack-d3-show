import * as d3 from 'd3';
import { generateRandom as _generateRandom, generateOneDimensionRandom } from './utils';

const INTERVAL = 10000;
const width = '100%';
const height = 500;
const generateRandom = _generateRandom.bind(this, height);
const data = generateOneDimensionRandom(30, height);
const rectWidth = 30;
const margin = 10;
const svg = d3.select('body').append('svg')
              .attr('width', width)
              .attr('height', height);
let timeoutRef;
const output = d3.select('#data');

function drawRect() {
  const elements = svg.selectAll('.rect')
    .data(data);
  const enter = elements.enter();
  const exit = elements.exit();
  // update
  elements
    .transition()
    .attr('height', (d) => d);
  // enter
  enter.append('rect')
    .attr('class', 'rect')
    .attr('x', (d, i) => (rectWidth + margin) * i)
    .attr('width', rectWidth)
    .attr('height', 0)
    .transition()
    .attr('height', (d) => d);
  // exit
  exit.remove();
}

function outputData() {
  output.text(data.join(' , '));
}

const reDrawRect = drawRect;

outputData();
drawRect();

d3.select('#push').on('click', () => {
  data.push(generateRandom());
  outputData();
  reDrawRect();
});
d3.select('#shift').on('click', () => {
  data.shift();
  outputData();
  reDrawRect();
});
d3.select('#splice').on('click', () => {
  data.splice(1, 1, generateRandom());
  outputData();
  reDrawRect();
});

let run = false;

function draw() {
  run = true;
  data.push(generateRandom());
  data.shift();
  outputData();
  reDrawRect();
  timeoutRef = window.setTimeout(draw, INTERVAL);
}

draw();

d3.select('#auto').on('click', () => {
  if (!run) {
    draw();
  }
});

d3.select('#stop').on('click', (...rest) => {
  console.log(this);
  console.log(rest);
  console.log(d3.event);
  if (!!timeoutRef) {
    window.clearTimeout(timeoutRef);
  }
  run = false;
});

d3.select('#loadOndemand').on('click', () => {
  console.log('lazy load modules');
  require.ensure([], (require) => {
    const s = require('./load-on-demand');
    console.log(s);
  });
});
