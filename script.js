/*
 * Define some variables
 *
 */

const data = [];
for (i = 0; i < 20; i++) {
  data.push({
    x: Math.floor(Math.random() * 100),
    y: Math.floor(Math.random() * 100),
    r: Math.floor(Math.random() * 15) + 1
  });
}

const margin = {
    top: 20,
    bottom: 20,
    left: 40,
    right: 40
  },
  svgWidth = 600,
  svgHeight = 600,
  width = svgWidth - margin.left - margin.right,
  height = svgHeight - margin.top - margin.bottom;

/*
 * Define the scales
 *
 */

const xScale = d3.scaleLinear()
  .domain([d3.min(data.map(d => d.x)), d3.max(data.map(d => d.x))])
  .range([0, width]);

const yScale = d3.scaleLinear()
  .domain([d3.min(data.map(d => d.y)), d3.max(data.map(d => d.y))])
  .range([0, height]);

var sequentialScale = d3.scaleSequential()
  .domain([d3.min(data.map(d => d.r)), d3.max(data.map(d => d.r))])
  .interpolator(d3.interpolateViridis);

/*
 * Create the svg and axis container and data container
 *
 */
const svg = d3.select('body')
  .append('svg')
  .attr('width', svgWidth)
  .attr('height', svgHeight);

const axisContainer = svg.append("g")
  .attr('transform', `translate(${margin.left},${margin.top})`);

axisContainer.append('g')
  .attr('transform', `translate(0,${height})`)
  .call(d3.axisBottom(xScale));

const dataContainer = axisContainer.append('g')
  .attr('id', 'data-container');


/*
 * Draw my data
 *
 */
let update = dataContainer.selectAll('g').data(data).enter().append('g')
  .attr('id', 'data-point');

update.append('circle')
  .attr('cx', (d) => xScale(d.x))
  .attr('cy', (d) => yScale(d.y))
  .attr('r', (d) => d.r)
  .attr('fill', (d) => sequentialScale(d.r))
  .style('cursor', 'pointer')
  .on('click', removeApple);

update.append('text')
  .text((d) => `${d.r}`)
  .style('user-select', "none")
  .style('pointer-events', "none")
  .attr('text-anchor', "middle")
  .attr('alignment-baseline', "middle")
  .attr('x', (d) => xScale(d.x))
  .attr('y', (d) => yScale(d.y));

function removeApple() {
  console.log(this.parentNode);
  this.parentNode.remove();
}
// .append('text')
// .text('hello');