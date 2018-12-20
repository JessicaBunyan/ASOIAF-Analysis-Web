import React, { Component } from 'react';
import * as d3 from "d3";
import * as _ from "underscore";


    const leftMargin = 30;

class Graph extends Component{

    
    componentDidMount() {
        this.createBarChart();
      }
      componentDidUpdate(){
        this.createBarChart();
      }

      render(){
          return (
              <div>
                    <h3>{this.props.word}</h3> 
                    <canvas width="960" height="500"></canvas>
              </div>

          );
      }
      createBarChart(){

        var canvas = document.querySelector("canvas"),
        context = canvas.getContext("2d");
    
        var margin = {top: 20, right: 20, bottom: 30, left: 60},
            width = canvas.width - margin.left - margin.right,
            height = canvas.height - margin.top - margin.bottom;
    
        var x = d3.scaleBand()
            .rangeRound([0, width])
            .padding(0.1);
    
        var y = d3.scaleLinear()
            .rangeRound([height, 0]);
    
              
        var chapters = (this.props.data);
        var refsByPov = _.countBy(chapters, c =>c.pov);
    
        var refsByPovKeys = Object.keys(refsByPov);
        var numberOfBars = refsByPovKeys.length;
    
        refsByPovKeys = _.sortBy(refsByPovKeys, k => 99999- refsByPov[k]);
    
        var max = _.max(refsByPov);
    
    
        x.domain(refsByPovKeys);
        y.domain([0, max]);
    
        var yTickCount = Math.ceil( max / 10.0),
            yTicks = y.ticks(yTickCount),
            yTickFormat = y.tickFormat(yTickCount);
    

        this.drawXAxisTicks(context, x, height);
        this.drawXAxisLine(context, height);
        this.drawXAxisLabels(context, x, height);

        this.drawYAxisTicks(context,yTicks, y);
        this.drawYAxisLine(context, height);
        this.drawYAxisLabels(context, yTicks, y);


        // Bars
        context.fillStyle = "steelblue";
        Object.keys(refsByPov).forEach(function(d) {
          console.log(d + refsByPov[d]);
            context.fillRect(x(d) + leftMargin, y(refsByPov[d]), x.bandwidth(), height - y(refsByPov[d]));
        });

    }    

    drawXAxisTicks(context, x, height){

        // X-axis "ticks"
        context.beginPath();
        x.domain().forEach(function(d) {
            context.moveTo(leftMargin + x(d) + x.bandwidth() / 2, height);
            context.lineTo(leftMargin + x(d) + x.bandwidth() / 2, height + 6);
        });
        context.strokeStyle = "black";
        context.stroke();
    }
    drawXAxisLine(context, height){

        context.beginPath();
        context.moveTo(leftMargin, height); 
        context.lineTo(910, height);
        context.strokeStyle = "black";
        context.stroke();
    }
    drawXAxisLabels(context,x, height){
    
        // X-axis labels (character/chapter names)
        context.textAlign = "center";
        context.textBaseline = "top";
        var i = 0;
        x.domain().forEach(function(d) {
            i++;
            var offset = i % 2 === 0 ? 10 : 0 
            context.fillText(d, leftMargin + x(d) + x.bandwidth() / 2, height + 6 + offset);
        });
    }

    drawYAxisTicks(context, yTicks, y){
        // y-axis "ticks" delineating axis
        context.beginPath();
        yTicks.forEach(function(d) {
            context.moveTo(leftMargin, y(d) + 0.5);
            context.lineTo(leftMargin - 5, y(d) + 0.5);
        });
        context.strokeStyle = "black";
        context.stroke();

    }
    drawYAxisLine(context, height){
        // Vertical Axis (line)
        context.beginPath();
        context.moveTo(leftMargin, 0); 
        context.lineTo(leftMargin, height);
        context.strokeStyle = "black";
        context.stroke();
    }
    drawYAxisLabels(context,yTicks, y){
        // y-axis scale labels 
        context.textAlign = "right";
        context.textBaseline = "middle";
        yTicks.forEach(function(d) {
            context.fillText(d, leftMargin-10, y(d));
        });
    }

    drawBars(){
        
    }
}



export default Graph