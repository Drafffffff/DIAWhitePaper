import * as d3 from "d3";
import { onMount } from "solid-js";
import dd from '../data/worksYear.json'
export default function WorksRegionBar() {
  const width = 1000;
  const height = 300;
  const margin = {
    top: 10,
    bottom: 70,
    left: 50,
    right: 30
  }
  const data = Array.from(d3.rollup(dd, v => d3.sum(v, d => d['数量']), d => d['国家'])).sort((a, b) => d3.descending(a[1], b[1]))
  // console.log(Array.from(data).sort((a, b) => d3.descending(a[1], b[1])))
  const countries = data.map(d => d[0])
  // const scaleY = d3.scaleLinear()
  const scaleY = d3.scalePow().exponent(0.35)
    .domain([0, d3.max(data, d => d[1])]).nice()
    .range([height - margin.bottom, margin.top])

  const scaleX = d3.scaleBand()
    .domain(countries)
    .range([margin.left, width - margin.right])
    .padding(0.1)

  const yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(scaleY).ticks(10))
    .call(g => g.select(".domain").remove())
  const yAxis2 = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(scaleY).tickValues([10,100,400,1000,2500]))
    .call(g => g.select(".domain").remove())
  const xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(scaleX).tickSizeOuter(0))


  onMount(() => {
    const root = d3.select('#WorksRegionBar')
    const svg = root.append('svg')
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;")

    svg.append('g')
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr("x", d => scaleX(d[0]))
      .attr("y", d => scaleY(d[1]))
      .attr("height", d => scaleY(0) - scaleY(d[1]))
      .attr("width", scaleX.bandwidth())
      // .attr('c',d=>console.log(d))
      .attr('fill', '#c8a062')
      .append('title')
      .text(d=>`${d[0]} ${d[1]}`)

    svg.append("g")
      .attr("class", "y-axis")
      .call(yAxis);
      svg.append("g")
      .attr("class", "y-axis2")
      .call(yAxis2);
    svg.append("g")
      .attr("class", "x-axisWorksRegionBar")
      .call(xAxis);

    d3.selectAll('.x-axisWorksRegionBar>.tick>text')
      .attr('transform', 'rotate(45 0 0) translate(5 0)')
      .attr('text-anchor', 'start')
      .attr('font-size', 8)
  })
  return (
    <div id="WorksRegionBar">
      <p>作品国家分布图</p>
    </div>
  )
}