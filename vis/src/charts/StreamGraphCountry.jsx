import * as d3 from "d3";
import { onMount } from "solid-js";
import data from '../data/worksYear.json';

export default function StreamGraphCountry() {
  const years = d3.group(data, d => d['年份']).keys()
  const countries = d3.group(data, d => d['国家']).keys()
  const countriesA = Array.from(countries)
  const counts = data.map(d => d['数量'])
  const tmp = Array.from(d3.group(data, d => d['年份']))
  const finalData = []
  for (let d of tmp) {
    const item = {
      '年份': d[0],
    }
    for (let i = 0; i < 69; i += 1) {
      const numbers = d[1].find(y => y['国家'] == countriesA[i])
      if (numbers) {
        item[countriesA[i]] = numbers['数量']
      } else {
        item[countriesA[i]] = 0
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


  onMount(() => {
    const root = d3.select('#StreamGraphCountry')
    const svg = root.append('svg')
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;")

    const color = d3.scaleOrdinal()
      .domain(countries)
      .range(
        [
          '#e41a1c', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf'
        ])

    // const color = d3.scaleOrdinal(countriesA, d3.quantize(d3.interpolateSinebow, countriesA.length))

    const stackedData = d3.stack()
      // .offset(d3.stackOffsetSilhouette)
      .keys(countriesA)
      (finalData)

    // console.log(stackedData)

    const scaleY = d3.scaleLinear()
      .domain([0, d3.max(counts, d => d)]).nice()
      .range([height - margin.bottom, margin.top])

    const scaleX = d3.scaleBand()
      .domain(years)
      .range([margin.left, width - margin.right+70])
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
        .x(function (d, i) { return scaleX(d.data['年份']) + scaleX.bandwidth() / 2; })
        .y0(function (d) { return scaleY(d[0]); })
        .y1(function (d) { return scaleY(d[1]); })
      )
      .append('title')
      .text(d => d.key)

  })

  return (
    <div id="StreamGraphCountry">
      <p>作品国家河流图</p>
    </div>
  )


}