import * as d3 from "d3";
import { onMount } from "solid-js";
import data from '../data/cate-year.json';

export default function CateYearBar() {
  const width = 600;
  const height = 400;
  const margin = {
    top: 10,
    bottom: 20,
    left: 40,
    right: 30
  }
  const groupedData = d3.group(data, d => d.target).get(2016)
  const names = groupedData.map(d => d.source)
  const years = Array.from(d3.group(data, d => d.target).keys())

  const scaleY = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)]).nice()
    .range([height - margin.bottom, margin.top])

  const scaleZ = d3.scaleBand()
    .domain(years)
    .range([margin.left, width - margin.right])
    .padding(0.2)

  const scaleX = d3.scaleBand()
    .domain(names)
    .range([0, scaleZ.bandwidth()])
    .padding(0.1)

  const yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(scaleY))
    .call(g => g.select(".domain").remove())

  const xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(scaleZ).tickSizeOuter(0))

  const color = d3.scaleOrdinal(names, d3.quantize(d3.interpolateRgb("#c8a062", "#a63035"), names.length))

  onMount(() => {
    const root = d3.select('#CateYearBar')
    const svg = root.append('svg')
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;")



    const rects = svg.selectAll('g')
      .data(data)
      .join('g')
      .append('rect')
      .attr('x', d => (scaleX(d.source) + scaleZ(parseInt(d.target))))
      .attr('y', d => scaleY(d.value))
      .attr('width', scaleX.bandwidth())
      .attr("height", d => scaleY(0) - scaleY(d.value))
      .attr('fill', '#fff')
      .attr('fill', d => color(d.source))
      .append('title')
      .text(d => `${d.source}  ${d.value}`)

    svg.append("g")
      .attr("class", "y-axis")
      .call(yAxis);
    svg.append("g")
      .attr("class", "x-axis")
      .call(xAxis);

    // console.log(d3.group(data,d=>d.target).get(2016))
    // console.log(d3.rollup(data, v => d3.sum(v, d => {
    //   console.log(v)
    //   return d.value}), d => d.target))
  })
  return (
    <div id='CateYearBar'>
      <p>作品类别年份分布</p>
    </div>
  )
}