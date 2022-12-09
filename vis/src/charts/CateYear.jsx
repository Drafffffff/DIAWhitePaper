import * as d3 from "d3";
import { onMount } from "solid-js";
import data from '../data/cate-year.json'
export default function CateYear() {

  onMount(() => {
    const innerRadius = 190
    const outerRadius = 195
    const width = 600;
    const height = 500;
    const margin = {
      top: 50,
      bottom: 10,
      left: 30,
      right: 30
    }
    // const names = Array.from(new Set(data.flatMap(d => [d.source, d.target]))).sort(d3.ascending)
    // console.log(names)
    const names = ['产业装备', '数字经济', '文化创新', '生活智慧', 2016, 2017, 2018, 2019, 2020, 2021, 2022]
    const color = d3.scaleOrdinal(names, d3.quantize(d3.interpolateCool, names.length))
    const ribbon = d3.ribbon()
      .radius(innerRadius - 1)
      .padAngle(1 / innerRadius)


    const arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)

    const chord = d3.chordDirected()
      .padAngle(10 / innerRadius)
      .sortSubgroups(d3.descending)
      .sortChords(d3.descending)

    const matrix = () => {
      const index = new Map(names.map((name, i) => [name, i]));
      const matrix = Array.from(index, () => new Array(names.length).fill(0));
      for (const { source, target, value } of data) matrix[index.get(source)][index.get(target)] += value;
      return matrix;
    }


    const root = d3.select('#CateYear')
    const svg = root.append('svg')
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;")

    const chords = chord(matrix());
    console.log(chords)
    const group = svg.append("g")
      .attr("font-size", 10)
      .attr("font-family", "sans-serif")
      .selectAll("g")
      .data(chords.groups)
      .join("g");

    group.append("path")
      .attr("fill", d => color(names[d.index]))
      .attr("d", arc);

    group.append("text")
      .each(d => (d.angle = (d.startAngle + d.endAngle) / 2))
      .attr("dy", "0.35em")
      .attr("transform", d => `
        rotate(${(d.angle * 180 / Math.PI - 90)})
        translate(${outerRadius + 5})
        ${d.angle > Math.PI ? "rotate(180)" : ""}
      `)
      .attr("text-anchor", d => d.angle > Math.PI ? "end" : null)
      .text(d => names[d.index])
      .attr('fill', '#fff');


    group.append("title")
      .text(d => `${names[d.index]}
${d3.sum(chords, c => (c.source.index === d.index) * c.source.value)} outgoing →
${d3.sum(chords, c => (c.target.index === d.index) * c.source.value)} incoming ←`)
      .attr('fill', '#fff');

    const chordLink = svg.append("g")
      .attr("fill-opacity", 0.75)
    const uid = `O-${Math.random().toString(16).slice(2)}`;


    chordLink.selectAll("path")
      .data(chords)
      .join("path")
      // .style("mix-blend-mode", "multiply")
      .attr("fill", d => color(names[d.target.index]))
      .attr("d", ribbon)
      .append("title")
      .text(d => `${names[d.source.index]} → ${names[d.target.index]} ${d.source.value}`)
      .attr('fill', '#fff');


  })
  return (
    <div id={'CateYear'}>
      <p>年份类别分布</p>
    </div>
  )
}