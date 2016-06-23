import * as d3 from 'd3';
import {
  generateOneDimensionRandom
} from './utils';

const data = generateOneDimensionRandom(6);
const pieLayout = d3.pie();

const width = 400;
const height = 400;
const outerRadius = 150;
const innerRadius = 50;

const canvas = d3.select('body').append('svg')
                .attr('width', width)
                .attr('height', height);
const arc = d3.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius);

const arcShape = canvas.selectAll('g.arc').data(pieLayout(data)).enter()
                    .append('g')
                    .attr('class', 'arc');

arcShape.attr('transform', `translate(${width / 2},${height / 2})`)
  .append('path')
  .attr('fill', (d, i) => d3.schemeCategory10[i])
  .attr('d', (d) => arc(d));

arcShape.append('text')
  .attr('transform', (d) => `translate(${arc.centroid(d)})`)
  .attr('text-anchor', 'middle')
  .text((d) => d.data);
