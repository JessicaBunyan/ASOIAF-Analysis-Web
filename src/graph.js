import React, { Component } from "react";
import * as d3 from "d3";
import * as _ from "underscore";

const leftMargin = 60;
const topMargin = 10;
const MaxBarWidth = 80;
const canvasWidth = 1200;

var elements = [];

class Graph extends Component {
  componentDidMount() {
    this.createBarChart();
  }
  componentDidUpdate() {
    this.clearCanvas();
    this.createBarChart();
  }

  render() {
    return (
      <div className="graph">
        <h3 className="selected-word got-font">{this.props.word}</h3>
        <canvas width={canvasWidth} height="500" />
      </div>
    );
  }

  onChartClick(e) {
    console.log("THIS");
    console.log(this);
    var canvas = document.querySelector("canvas");
    var elemLeft = canvas.offsetLeft;
    var elemTop = canvas.offsetTop;

    var x = e.offsetX,
      y = e.offsetY;

    // Collision detection between clicked offset and element.
    elements.forEach(element => {
      if (
        y >= element.top &&
        y <= element.top + element.height &&
        x >= element.left &&
        x <= element.left + element.width
      ) {
        this.props.onClickCallback(element.char);
      }
    });
  }

  clearCanvas() {
    var canvas = document.querySelector("canvas");
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, 10000, 10000);
  }
  createBarChart() {
    var data = this.props.data;
    var canvas = document.querySelector("canvas"),
      context = canvas.getContext("2d");

    this.onChartClick.bind(this);
    canvas.addEventListener("click", e => this.onChartClick(e));

    var margin = { top: 20, right: 20, bottom: 30, left: 60 },
      width = canvas.width - margin.left - margin.right,
      height = canvas.height - margin.top - margin.bottom;

    var x = d3
      .scaleBand()
      .rangeRound([0, width])
      .padding(0.1);

    var y = d3.scaleLinear().rangeRound([height, 0]);

    var keys = Object.keys(data);
    keys = _.sortBy(keys, k => 99999 - data[k]);
    var max = _.max(data);

    var yAxisLimit = this.getYAxisLimit(max);
    x.domain(keys);
    y.domain([0, yAxisLimit]);

    var yTickCount = this.getYTickCount(max);

    console.log("Y TICK COUNT: " + yTickCount);
    var yTicks = y.ticks(yTickCount);

    context.fillStyle = "black";
    this.drawXAxisTicks(context, x, height);
    this.drawXAxisLine(context, height);
    this.drawXAxisLabels(context, x, height);

    this.drawYAxisTicks(context, yTicks, y);
    this.drawYAxisLine(context, height);
    this.drawYAxisLabels(context, yTicks, y);

    elements = [];
    // Bars
    context.fillStyle = "steelblue";
    Object.keys(data).forEach(function(d) {
      console.log(d + data[d]);

      var width = x.bandwidth();
      var diff = 0;
      if (width > MaxBarWidth) {
        // if we're limiting the bar width we need to adjust the left position to account for the difference
        diff = width - MaxBarWidth;
        width = MaxBarWidth;
      }
      var el = {
        char: d,
        left: x(d) + leftMargin + diff / 2,
        top: y(data[d]) + topMargin,
        width: width,
        height: height - y(data[d])
      };
      elements.push(el);

      context.fillRect(el.left, el.top, el.width, el.height);
    });
  }

  getYAxisLimit(max) {
    var roundToNearest = max < 10 ? max : max < 20 ? 2 : max < 40 ? 5 : 10;
    var yAxisLimit = Math.ceil(max / roundToNearest) * roundToNearest;
    return yAxisLimit;
  }

  getYTickCount(max) {
    var yTickCount;
    yTickCount = Math.ceil(
      max < 10 ? max : max < 20 ? max / 2 : max < 40 ? max / 5 : max / 10
    );

    return yTickCount;
  }

  drawXAxisTicks(context, x, height) {
    // X-axis "ticks"

    var i = 0;
    context.beginPath();
    x.domain().forEach(function(d) {
      i++;
      var offset = i % 2 === 0 ? 20 : 0;
      context.moveTo(leftMargin + x(d) + x.bandwidth() / 2, height + topMargin);
      context.lineTo(
        leftMargin + x(d) + x.bandwidth() / 2,
        height + 6 + topMargin + offset
      );
    });
    context.strokeStyle = "black";
    context.stroke();
  }
  drawXAxisLine(context, height) {
    context.beginPath();
    context.moveTo(leftMargin, height + topMargin);
    context.lineTo(canvasWidth, height + topMargin);
    context.strokeStyle = "black";
    context.stroke();
  }
  drawXAxisLabels(context, x, height) {
    // X-axis labels (character/chapter names)
    context.textAlign = "center";
    context.textBaseline = "top";
    context.font = "18px Arial";
    var i = 0;
    x.domain().forEach(function(d) {
      i++;
      var offset = i % 2 === 0 ? 20 : 0;
      context.fillText(
        d,
        leftMargin + x(d) + x.bandwidth() / 2,
        height + 6 + offset + topMargin
      );
    });
  }

  drawYAxisTicks(context, yTicks, y) {
    // y-axis "ticks" delineating axis
    context.beginPath();
    console.log("y ticks");
    console.log(yTicks);
    yTicks.forEach(function(d) {
      context.moveTo(leftMargin, y(d) + 0.5 + topMargin);
      context.lineTo(leftMargin - 5, y(d) + 0.5 + topMargin);
    });
    context.strokeStyle = "black";
    context.stroke();
  }
  drawYAxisLine(context, height) {
    // Vertical Axis (line)
    context.beginPath();
    context.moveTo(leftMargin, topMargin);
    context.lineTo(leftMargin, height + topMargin);
    context.strokeStyle = "black";
    context.stroke();
  }
  drawYAxisLabels(context, yTicks, y) {
    // y-axis scale labels
    context.textAlign = "right";
    context.textBaseline = "middle";
    context.font = "18px Arial";
    yTicks.forEach(function(d) {
      context.fillText(d, leftMargin - 10, y(d) + topMargin);
    });
  }
}

export default Graph;
