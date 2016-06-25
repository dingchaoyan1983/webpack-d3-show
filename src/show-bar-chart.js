import * as d3 from 'd3';
import {
  random,
  generateRandomArray
} from './utils';

const INTERVAL = 1000;
const width = 400;
const height = 400;
const generateRandom = random.bind(this, height);
const data = generateRandomArray(10, height);
const rectWidth = 30;
const margin = 10;
const svg = d3.select('body').append('svg')
              .attr('width', width)
              .attr('height', height);
let timeoutRef;
const output = d3.select('#data');

function drawRect() {
  const elements = svg.selectAll('.rect').data(data);
  const enter = elements.enter();
  const exit = elements.exit();
  // update
  elements.select('rect')
    .transition()
    .attr('height', (d) => d);

  elements.select('text')
    .transition()
    .attr('transform', (d) => `translate(${rectWidth / 2}, ${d})`)
    .text((d) => d);

  // enter
  const rectGroup = enter.append('g')
    .attr('class', 'rect')
    .attr('transform', (d, i) => `translate(${(rectWidth + margin) * i}, 0)`);

  rectGroup.append('rect')
    .attr('width', rectWidth)
    .attr('height', 0)
    .transition()
    .attr('height', (d) => d);

  rectGroup.append('text')
    .attr('fill', '#d62728')
    .attr('width', rectWidth + margin)
    .attr('text-anchor', 'middle')
    .attr('transform', 'translate(0, 0)')
    .transition()
    .attr('transform', (d) => `translate(${rectWidth / 2}, ${d})`)
    .text((d) => d);

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

d3.select('#stop').on('click', () => {
  if (!!timeoutRef) {
    window.clearTimeout(timeoutRef);
  }
  run = false;
});

d3.select('#loadOndemand').on('click', () => {
  require.ensure([], (require) => {
    require('./load-on-demand');
  });
});
