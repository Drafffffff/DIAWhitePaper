import * as d3 from "d3";
import { onMount } from "solid-js";
import dd from '../data/groupby_country.json'
export default function RegoinExpert() {
  const data = dd.sort((a, b) => b.value - a.value)
  onMount(() => {
    const width = 600;
    const height = 400;
    const margin = {
      top: 10,
      bottom: 50,
      left: 30,
      right: 30
    }
    const div = d3.select("body").append("div")
      .attr("class", "tooltip-donut")
      .style("opacity", 0);
    const scaleY = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)]).nice()
      .range([height - margin.bottom, margin.top])

    const scaleX = d3.scaleBand()
      .domain(data.map(d => d.name))
      .range([margin.left, width - margin.right])
      .padding(0.1)

    const yAxis = g => g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(scaleY))
      .call(g => g.select(".domain").remove())

    const xAxis = g => g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(scaleX).tickSizeOuter(0))

    const root = d3.select('#RegoinExpert')
    const svg = root.append('svg')
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
      // .call(zoom);
    const node = svg.append('g')
      .attr('class', 'bars')
      .selectAll('rect')
      .data(data)
      .join("rect")
      .attr("x", d => scaleX(d.name))
      .attr("y", d => scaleY(d.value))
      .attr("height", d => scaleY(0) - scaleY(d.value))
      .attr("width", scaleX.bandwidth())
      .attr('fill', '#c8a062')
      .on('mouseover', function (d, dd) {
        d3.select(this).transition()
          .duration('50')
          .attr('fill', '#e8c082')
        div.html(dd.value)
          .style("left", (d.pageX + 10) + "px")
          .style("top", (d.pageY - 15) + "px");
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
          .attr('fill', '#c8a062')
        div.transition()
          .duration('50')
          .style("opacity", 0);
      })

    svg.append("g")
      .attr("class", "y-axis")
      .call(yAxis);
    svg.append("g")
      .attr("class", "x-axis")
      .call(xAxis);
    d3.selectAll('.x-axis>.tick>text')
      .attr('transform', 'rotate(50 0 0) translate(5 0)')
      .attr('text-anchor', 'start')
      .attr('font-size', 9)
    function zoom(svg) {
      const extent = [[margin.left, margin.top], [width - margin.right, height - margin.top]];
      svg.call(d3.zoom()
        .scaleExtent([1, 8])
        .translateExtent(extent)
        .extent(extent)
        .on("zoom", zoomed));
      function zoomed(event) {
        scaleX.range([margin.left, width - margin.right].map(d => event.transform.applyX(d)));
        svg.selectAll(".bars rect").attr("x", d => scaleX(d.name)).attr("width", scaleX.bandwidth());
        svg.selectAll(".x-axis").call(xAxis);
      }
    }
  })


  return (
    <div id="RegoinExpert">
      <p>专家地区分布</p>
    </div>
  )
}