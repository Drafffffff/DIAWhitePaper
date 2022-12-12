import * as d3 from "d3";
import { onMount } from "solid-js";
import dd from '../data/worksYear.json'
import world from '../data/countries-50m.json'
import * as topojson from "topojson"
export default function WorksRegionMap() {
  const data = Array.from(d3.rollup(dd, v => d3.sum(v, d => d['数量']), d => d['EN'])).sort((a, b) => d3.descending(a[1], b[1]))
  const color = d3.scaleSequentialSqrt([0, 800], d3.interpolateRgb("#c8a062", "#a63035"))
  const width = 800;
  const height = 400;
  const countries = topojson.feature(world, world.objects.countries)
  const projection = d3.geoNaturalEarth1()
    .scale(width / 1.8 / Math.PI)
    .translate([width / 2, height / 2])


  onMount(() => {

    const root = d3.select('#WorksRegionMap')
    const svg = root.append('svg')
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
    svg.append("g")
      .selectAll("path")
      .data(countries.features)
      .enter().append('g').append("path")
      .attr("fill", (d, i) => {
        const name = d.properties.name
        const a = data.find(dd => dd[0] === name)
        return a ? (a[1] < 800 ? color(a[1]) : "#a63035") : '#333'
      })
      .attr("d", d3.geoPath()
        .projection(projection)
      )
      .append('title')
      .text(d => `${d.properties.name} ${data.find(dd => dd[0] === d.properties.name) ? data.find(dd => dd[0] === d.properties.name)[1] : ''}`)
  })

  return (
    <div id="WorksRegionMap">
      <p>作品世界地图</p>
    </div>
  )
}