
import * as d3 from "d3";
import { onMount } from "solid-js";
import dd from '../data/groupby_country.json'
import world from '../data/countries-50m.json'
import * as topojson from "topojson"
export default function ExpertMap() {

  const width = 800;
  const height = 400;
  const margin = {
    top: 50,
    bottom: 10,
    left: 30,
    right: 30
  }
  const countries = topojson.feature(world, world.objects.countries)
  const rename = new Map([
    ["中国", "China"],
    ["中国（台湾）", "Taiwan"],
    ["中国（香港）", "Hong Kong"],
    ["丹麦", "Denmark"],
    ["以色列", "Israel"],
    ["伊朗", "Iran"],
    ["克罗地亚", "Croatia"],
    ["加拿大", "Canada"],
    ["南非", "South Africa"],
    ["印度", "India"],
    ["印度尼西亚", "Indonesia"],
    ["土耳其", "Turkey"],
    ["奥地利", "Austria"],
    ["德国", "Germany"],
    ["意大利", "Italy"],
    ["挪威", "Norway"],
    ["日本", "Japan"],
    ["法国", "France"],
    ["波兰", "Poland"],
    ["泰国", "Thailand"],
    ["澳大利亚", "Australia"],
    ["瑞典", "Sweden"],
    ["瑞士", "Switzerland"],
    ["美国", "United States of America"],
    ["老挝", "Laos"],
    ["肯尼亚", "Kenya"],
    ["芬兰", "Finland"],
    ["英国", "United Kingdom"],
    ["荷兰", "Netherlands"],
    ["葡萄牙", "Portugal"],
    ["西班牙", "Spain"],
    ["韩国", "South Korea"],
    ["新加坡", "Singapore"]
  ])

  const data = [...dd].map(d => {
    return {
      name: rename.get(d.name),
      value: d.value
    }
  })

  const names = data.map(d => d.name)
  const values = data.map(d => d.value)

  const color = d3.scaleSequentialSqrt([0, d3.max(values)], d3.interpolateRgb("#c8a062", "#a63035"))

  const projection = d3.geoNaturalEarth1()
    .scale(width / 1.8 / Math.PI)
    .translate([width / 2, height / 2])



  onMount(() => {
    const root = d3.select('#ExpertMap')
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
        const a = data.find(dd => dd.name === name)
        return a ? color(a.value) : '#333'
      })
      // .attr()
      .attr("d", d3.geoPath()
        .projection(projection)
      )
      .append('title')
      .text(d => `${d.properties.name} ${data.find(dd => dd.name === d.properties.name) ? data.find(dd => dd.name === d.properties.name).value : ''}`)
    // .style("stroke", "#fff")

  })
  return (
    <div id='ExpertMap'>
      <p>专家世界地图</p>
      {/* {countries.features.map(d => d.properties.name).sort().map(d => <p>{d}</p>)} */}
    </div>
  )

}