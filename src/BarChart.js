import React, { Component } from 'react'
import './App.css'
import * as d3 from 'd3';
import { scaleLinear } from 'd3-scale';
import { select } from 'd3-selection';
import {csv} from 'd3-request';
import { max } from 'd3-array';

import {
  axisBottom as d3AxisBottom,
  axisLeft as d3AxisLeft,
} from 'd3-axis';

class BarChart extends Component {
   constructor(props){
      super(props)
      this.props.data;

      this.createBarChart = this.createBarChart.bind(this)
      d3.csv('chr20.csv', (error, data) => {
        const max_end = data.reduce((acc, curr) => {
          return Math.max(acc, curr.end);  }, 0);
        console.log(max_end)
        this.setState({ data : data, scale: scaleLinear().domain([0, max_end]).range([50, 800]) });
        this.createBarChart();
      });
   }

   componentDidUpdate() {
      this.createBarChart()
      this.createYAxis();
   }

   createYAxis() {
     const yAxis = this.yAxis;
     d3AxisLeft().scale(this.state.scale.ticks(20));
   }



   createBarChart() {
      const node = this.node
      console.log(this.state)
      const dataMax = max(this.state.data)

     select(node)
      .selectAll('rect')
      .data(this.state.data)
      .enter()
      .append('rect')

     select(node)
      .selectAll('rect')
      .data(this.state.data)
      .exit()
      .remove()

      select(node)
      .selectAll('rect')
      .data(this.state.data)
      .style('fill', 'lightblue')
      .attr('x', 100)
      .attr('y', d => 700 - this.state.scale(d.start))
      .attr('height', 3)
      .attr('width', 25)
   }
render() {
      return (
        <svg>
         <g className="yAxis" ref={ yAxis => this.yAxis = yAxis } />
         <svg ref={node => this.node = node} width={this.props.size[0]} height={this.props.size[1]}>
         </svg>
        </svg>
      )
   }
}
export default BarChart
