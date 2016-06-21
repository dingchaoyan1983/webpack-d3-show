import * as d3 from 'd3';

let width  = 500;
let height = 500;
let data = d3.range(10).map(function() {
  return generateRandom();
});
let rectWidth = 30;
let margin = 10;
let svg = d3.select('body').append('svg').attr('width', width).attr('height', height);
let timeoutRef;
let output = d3.select('#data');

function generateRandom() {
  return Math.floor(Math.random() * height);
}

function drawRect() {
  let elements = svg.selectAll('.rect')
    .data(data);
  let enter = elements.enter();
  let exit = elements.exit();
  //update
  elements
    .transition()
    .attr('height', function(d) {
      return d
    });
  //enter
  enter.append('rect')
    .attr('class', 'rect')
    .attr('x', function(d, i) {
      return (rectWidth + margin) * i
    })
    .attr('width', rectWidth)
    .attr('height', 0)
    .transition()
    .attr('height', function(d) {
      return d;
    });
  //exit
  exit.remove();
}

function outputData() {
  output.text(data.join(' , '))
}

let reDrawRect = drawRect;

outputData();
drawRect();

d3.select('#push').on('click', function() {
  data.push(generateRandom());
  outputData();
  reDrawRect();
});
d3.select('#shift').on('click', function() {
  data.shift();
  outputData();
  reDrawRect();
});
d3.select('#splice').on('click', function() {
  data.splice(1, 1, generateRandom());
  outputData();
  reDrawRect();
});

function draw() {
  data.push(generateRandom());
  data.shift();
  outputData();
  reDrawRect();
  timeoutRef = window.setTimeout(draw, 500);
}

draw();

d3.select('#auto').on('click', function() {
    timeoutRef = window.setTimeout(draw, 500);
});

console.log(d3.timer);

d3.select('#stop').on('click', function() {
  console.log(this);
  console.log(arguments);
  console.log(d3.event)
  if (!!timeoutRef) {
    window.clearTimeout(timeoutRef);
  }
});
