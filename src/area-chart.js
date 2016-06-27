import { generateContinuesPoints } from './utils';
import * as d3 from 'd3';

const data = generateContinuesPoints(10, 10000, 10000);
const width = 500;
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

const pathContainer = canvas.append('g')
                        .attr('transform', `translate(${padding}, 0)`);

const area = d3.area()
              .x((d) => xScale(d.x))
              .y1((d) => yScale(d.y))
              .y0(() => yScale(0))
              .curve(d3.curveCatmullRom.alpha(0.5));

pathContainer.append('path')
              .attr('class', 'area')
              .datum(data)
              .attr('d', area);
