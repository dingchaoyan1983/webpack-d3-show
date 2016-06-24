import { generatePointsRandom } from './utils';
import * as d3 from 'd3';

const data = generatePointsRandom(10, 10000, 10000);
const width = 600;
const height = 400;
const padding = 50;
const buffer = 1000;

const canvas = d3.select('body').append('svg')
                  .attr('width', width)
                  .attr('height', height);

const xScale = d3.scaleLinear().domain([0, d3.max(data, (item) => item.x) + buffer]).range([0, width - padding]);
const yScale = d3.scaleLinear().domain([0, d3.max(data, (item) => item.y) + buffer]).range([height - padding, 0]);
const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale);

canvas.append('g')
  .attr('class', 'axis')
  .attr('transform', `translate(${padding}, ${height - padding})`)
  .call(xAxis);


canvas.append('g')
  .attr('class', 'axis')
  .attr('transform', `translate(${padding}, 0)`)
  .call(yAxis);

const pointsContainer = canvas.append('g')
                                .attr('transform', `translate(${padding}, 0)`);

const pointGroup = pointsContainer.selectAll('g')
                .data(data)
                .enter()
                .append('g');

pointGroup.append('circle')
  .attr('class', 'point')
  .attr('cx', (d) => xScale(d.x))
  .attr('cy', (d) => yScale(d.y))
  .attr('r', '4');

pointGroup.append('text')
  .attr('x', (d) => xScale(d.x))
  .attr('y', (d) => yScale(d.y) - 8)
  .attr('text-anchor', 'middle')
  .text((d) => d.y);

const lineContainer = canvas.append('g')
                        .attr('transform', `translate(${padding}, 0)`);

const line = d3.line()
              .x((d) => xScale(d.x))
              .y((d) => yScale(d.y))
              .curve(d3.curveCatmullRom.alpha(0.5));

lineContainer.append('path')
              .attr('class', 'line')
              .datum(data)
              .attr('d', line);
