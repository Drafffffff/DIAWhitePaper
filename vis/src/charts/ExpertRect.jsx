import * as d3 from "d3";
import { onMount } from "solid-js";
import dd from '../data/expert.json'
export default function ExpertRect() {


  const data = dd
  const width = 600;
  const height = 200;
  const margin = {
    top: 50,
    bottom: 10,
    left: 30,
    right: 30
  }
  const rectC = {
    工业设计: '#c8a062',
    市场营销: '#727171',
    广告学: '#856239',
    建筑: '#898989',
    计算机: '#a63035'
  }
  onMount(() => {
    const div = d3.select("body").append("div")
      .attr("class", "ExpertRectlabel")
      .style("opacity", 0);

    const root = d3.select('#ExpertRect')
    const svg = root.append('svg')
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;")

    const scaleX = d3.scaleLinear()
      .domain([0, dd.length / 10])
      .range([margin.left, width - margin.right])

    const xAxis = g => g
      .attr("transform", `translate(0,${margin.top})`)
      .call(d3.axisTop(scaleX).ticks(20))


    const rect = svg.append('g')
      .attr('class', 'rect')

    rect.selectAll('rect')
      .data(data)
      .join('rect')
      .attr('fill', d => {
        return rectC[d['专业背景']] || '#ccc'
      })
      .attr('x', (d, i) => scaleX(parseInt(i / 10)))
      .attr('y', (d, i) => {
        const a = i % 10 * 11
        return margin.top + 20 + a
      })
      .attr('width', 16)
      .attr('height', 10)
      .on('mouseover', function (d, dd) {
        d3.select(this).transition()
          .duration('50')
          .attr('fill', '#fff')
        div
          .style("left", (d.pageX + 10) + "px")
          .style("top", (d.pageY - 15) + "px");

        div.selectAll('p')
          .data(Object.keys(dd))
          .join('p')
          .text((d, i) => `${(d + ':')}　${Object.values(dd)[i] || '无数据'}`)

        div.transition()
          .duration(50)
          .style("opacity", 0.8);
      })
      .on('mousemove', function (d, i) {
        div.style("left", (d.pageX + 10) + "px")
          .style("top", (d.pageY - 15) + "px");
      })
      .on('mouseout', function (d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('fill', rectC[i['专业背景']] || '#ccc')
        div.transition()
          .duration('50')
          .style("opacity", 0);
      })
    svg.append("g")
      .attr("class", "x-axis")
      .call(xAxis);
  })
  return (
    <div id='ExpertRect'>
      <p>专家(专业背景)</p>
    </div>
  )
}