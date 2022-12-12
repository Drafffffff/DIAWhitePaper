import * as d3 from "d3";
import { onMount } from "solid-js";
import data from '../data/cate-year.json'
export default function StreamGraphCate() {
  const years = Array.from(d3.group(data, d => d.target).keys())
  const cate = Array.from(d3.group(data, d => d.source).keys())
  const grouped = Array.from(d3.group(data, d => d.target))
  const values = d3.map(data, d => d.value)
  const finalData = []
  for (let d of grouped) {
    const item = {
      'year': d[0],
    }
    for (let i = 0; i < cate.length; i += 1) {
      const numbers = d[1].find(y => y.source == cate[i])
      if (numbers) {
        item[cate[i]] = numbers.value
      } else {
        item[cate[i]] = 0
      }
    }
    finalData.push(item)
  }
  const width = 800;
  const height = 300;
  const margin = {
    top: 10,
    bottom: 20,
    left: 40,
    right: 30
  }

  console.log(values)
  onMount(() => {
    const root = d3.select('#StreamGraphCate')
    const svg = root.append('svg')
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
    const stackedData = d3.stack()

      .keys(cate)
      (finalData)


      const color = d3.scaleOrdinal()
      .domain(cate)
      .range(
        [
          '#e41a1c', '#4daf4a', '#984ea3', '#ff7f00'
        ])

    const scaleY = d3.scaleLinear()
      .domain([0, 8000]).nice()
      .range([height - margin.bottom, margin.top])

    const scaleX = d3.scaleBand()
      .domain(years)
      .range([margin.left, width - margin.right + 70])
    // .padding(0.1)

    const yAxis = g => g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(scaleY))
      .call(g => g.select(".domain").remove())

    const xAxis = g => g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(scaleX).tickSizeOuter(0))

    svg.append("g")
      .attr("class", "y-axis")
      .call(yAxis);
    svg.append("g")
      .attr("class", "x-axis")
      .call(xAxis);




    svg.selectAll("mylayers")
      .data(stackedData)
      .join("path")
      .style("fill", function (d) { return color(d.key); })
      .attr("d", d3.area()
        .curve(d3.curveCardinal)
        .x(function (d, i) { return scaleX(d.data['year']) + scaleX.bandwidth() / 2; })
        .y0(function (d) { return scaleY(d[0]); })
        .y1(function (d) { return scaleY(d[1]); })
      )
      .append('title')
      .text(d => d.key)
  })
  return (
    <div id='StreamGraphCate'>
      <p>年份类别河流图</p>
    </div>
  )
}