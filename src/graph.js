import React, { Component } from 'react';
import * as d3 from "d3";
import * as _ from "underscore";


    const leftMargin = 30;
    const topMargin = 10;

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

        var data = this.props.data;
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
    
             
        var keys = Object.keys(data);    
        keys = _.sortBy(keys, k => 99999- data[k]);
        var max = _.max(data);
    
        
        x.domain(keys);
        y.domain([0, max]);
    
        var yTickCount = this.getYTickCount(max);


        console.log("Y TICK COUNT: " + yTickCount);
        // Math.ceil( max / 10.0);
        var yTicks = y.ticks(yTickCount);
    

        this.drawXAxisTicks(context, x, height);
        this.drawXAxisLine(context, height);
        this.drawXAxisLabels(context, x, height);

        this.drawYAxisTicks(context,yTicks, y);
        this.drawYAxisLine(context, height);
        this.drawYAxisLabels(context, yTicks, y);


        // Bars
        context.fillStyle = "steelblue";
        Object.keys(data).forEach(function(d) {
          console.log(d + data[d]);
            context.fillRect(x(d) + leftMargin, y(data[d]) + topMargin, x.bandwidth(), height - y(data[d]));
        });

    }    
    
    getYTickCount(max){
        var yTickCount;
        yTickCount = max < 10 ? max : 
            max < 20 ? max / 2 :
                max < 40 ? max / 5 : max /10 ;
                    // max < 80 ? max /10 : max/5

        return yTickCount;
    }

    drawXAxisTicks(context, x, height){


        // X-axis "ticks"
        context.beginPath();
        x.domain().forEach(function(d) {
            context.moveTo(leftMargin + x(d) + x.bandwidth() / 2, height + topMargin);
            context.lineTo(leftMargin + x(d) + x.bandwidth() / 2, height + 6 + topMargin);
        });
        context.strokeStyle = "black";
        context.stroke();
    }
    drawXAxisLine(context, height){

        context.beginPath();
        context.moveTo(leftMargin, height + topMargin); 
        context.lineTo(910, height + topMargin);
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
            context.fillText(d, leftMargin + x(d) + x.bandwidth() / 2, height + 6 + offset + topMargin);
        });
    }

    drawYAxisTicks(context, yTicks, y){
        // y-axis "ticks" delineating axis
        context.beginPath();
        yTicks.forEach(function(d) {
            context.moveTo(leftMargin, y(d) + 0.5 + topMargin);
            context.lineTo(leftMargin - 5, y(d) + 0.5 + topMargin);
        });
        context.strokeStyle = "black";
        context.stroke();

    }
    drawYAxisLine(context, height){
        // Vertical Axis (line)
        context.beginPath();
        context.moveTo(leftMargin, topMargin); 
        context.lineTo(leftMargin, height+topMargin);
        context.strokeStyle = "black";
        context.stroke();
    }
    drawYAxisLabels(context,yTicks, y){
        // y-axis scale labels 
        context.textAlign = "right";
        context.textBaseline = "middle";
        yTicks.forEach(function(d) {
            context.fillText(d, leftMargin-10, y(d) + topMargin);
        });
    }
}



export default Graph