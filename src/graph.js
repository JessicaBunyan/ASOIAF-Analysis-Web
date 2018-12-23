import React, { Component } from "react";
import * as d3 from "d3";
import * as _ from "underscore";
import capitalise from "./utils";

const leftMargin = 60;
const topMargin = 100;
const MaxBarWidth = 80;
const canvasWidth = 1200;
const axisLabelFontSize = 20;
const singleBookOffset = 20;
const barPadding = 0.05;
const bookColours = {
  1: "rgba(0,0,255,0.2)",
  2: "rgba(0,255,0,0.2)",
  3: "rgba(255,255,0,0.2)",
  4: "rgba(255,0,0,0.2)",
  5: "rgba(255,255,255,0.2)"
};

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
        <h4 className="breakdown ">
          {this.getBreakdownText(this.props.breakdown)}
        </h4>
        <canvas width={canvasWidth} height="800" />
      </div>
    );
  }

  getBreakdownText() {
    if (this.props.breakdown) {
      return (
        this.getTotalOccurrences() +
        " by " +
        capitalise(this.props.breakdown) +
        " chapter"
      );
    }
    return this.getTotalOccurrences() + " by PoV Character";
  }

  getTotalOccurrences() {
    var count = 0;
    Object.keys(this.props.data).forEach(k => {
      count += this.props.data[k];
    });

    return count + " occurrences, ";
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

    var margin = { top: 20, right: 20, bottom: 300, left: 60 },
      width = canvas.width - margin.left - margin.right,
      height = canvas.height - margin.top - margin.bottom;

    // if we're breaking down by chapter allow room for gaps between books
    width = this.props.breakdown ? width - 5 * singleBookOffset : width;

    var x = d3
      .scaleBand()
      .rangeRound([0, width])
      .padding(barPadding);

    var y = d3.scaleLinear().rangeRound([height, 0]);

    var keys = Object.keys(data);
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

    this.drawBookBoundaries(context, x, width, height);
    this.drawBars(context, data, x, y, height);
  }

  drawBookBoundaries(context, x, canvasWidth, height) {
    if (!this.props.breakdown) {
      return;
    }

    var barWidth = x.bandwidth();

    var bookInfo = this.getChaptersPerBook();

    var boundaryChapters = [];

    var first = -1,
      last = -1;
    for (var k = 1; k < 6; k++) {
      console.log(bookInfo[k]);
      if (bookInfo[k].length) {
        // if it has chapters
        first = bookInfo[k][0];
        last = bookInfo[k][bookInfo[k].length - 1];
        boundaryChapters.push(first);
        boundaryChapters.push(last);
      } else {
        boundaryChapters.push(last);
        boundaryChapters.push(last);
      }
    }

    // for (var i = boundaryChapters.length - 1; i >= 0; i--) {
    //   if (boundaryChapters[i] == -1) {
    //     boundaryChapters[i] = boundaryChapters[i + 1];
    //   }
    // }

    var barCenters = boundaryChapters.map(c =>
      c == -1 ? -1 : this.getBarLeft(x, c) + barWidth / 2
    );
    var midPoints = [0];

    console.log("boundary chapters");
    console.log(boundaryChapters);
    console.log(barCenters);

    for (var i = 1; i < barCenters.length - 1; i += 2) {
      var endBar = barCenters[i];
      var startBar = barCenters[i + 1];

      console.log("bars: " + endBar + ", " + startBar);
      console.log("midpoints so far: ");
      console.log(midPoints);

      var midPoint = startBar - leftMargin + (endBar - startBar) / 2;

      if (endBar == startBar) {
        midPoint = -1;
      }
      console.log("new midpoint");
      console.log(midPoint);
      midPoints.push(midPoint);
    }

    midPoints.push(canvasWidth + 4 * singleBookOffset);

    console.log("boundary chapters");
    console.log(boundaryChapters);
    console.log(barCenters);
    console.log("midpoints");
    console.log(midPoints);

    for (var i = 1; i < midPoints.length - 1; i++) {
      if (midPoints[i] < midPoints[i - 1]) {
        midPoints[i] = midPoints[i - 1] + singleBookOffset;
      } else {
        break;
      }
    }
    console.log(midPoints);
    var negatives = _.filter(midPoints, m => m == -1);
    var numNegatives = negatives.length;
    for (var i = midPoints.length - 1; i >= 0; i--) {
      if (midPoints[i] == -1) {
        console.log("num negatives: " + numNegatives);
        midPoints[i] = midPoints[i + 1] - (singleBookOffset / 2) * numNegatives;
        if (numNegatives == 1) {
          midPoints[i + 1] += singleBookOffset / 2;
        }
      }
    }
    console.log(midPoints);

    // midPoints = [0, 460, 760, 1060, 1080, 1100];

    for (var book = 1; book < 6; book++) {
      var left = midPoints[book - 1];
      var width = midPoints[book] - left;
      context.fillStyle = bookColours[book];
      context.fillRect(leftMargin + left, 0, width, height + topMargin + 150);
    }
  }

  getChaptersPerBook() {
    var dataKeys = Object.keys(this.props.data);

    console.log(dataKeys);
    console.log(dataKeys.length);
    var chapterLimits = this.props.chapterLimits;

    var bookInfo = {
      0: [], // handy filling for looping and comparing to prev
      1: [],
      2: [],
      3: [],
      4: [],
      5: []
    };
    dataKeys.forEach(k => {
      console.log(k);
      for (var book = 1; book < 6; book++) {
        if (k > chapterLimits[book - 1] && k <= chapterLimits[book]) {
          bookInfo[book].push(k);
          return;
        }
      }
    });

    console.log("BOOK INFO");
    console.log(bookInfo);
    return bookInfo;
  }

  getBookOffset(d) {
    if (!this.props.breakdown) {
      return 0;
    }

    for (var i = 1; i < 5; i++) {
      if (d > this.props.chapterLimits[i]) {
        continue;
      }
      break;
    }
    return (i - 1) * singleBookOffset;
  }

  getYAxisLimit(max) {
    var roundToNearest =
      max < 10 ? max : max < 20 ? 2 : max < 40 ? 5 : max < 200 ? 10 : 25;
    var yAxisLimit = Math.ceil(max / roundToNearest) * roundToNearest;
    return yAxisLimit;
  }

  getYTickCount(max) {
    var yTickCount;
    yTickCount = Math.ceil(
      max < 10
        ? max
        : max < 20
        ? max / 2
        : max < 40
        ? max / 5
        : max < 200
        ? max / 10
        : max / 25
    );

    return yTickCount;
  }

  drawXAxisTicks(context, x, height) {
    // X-axis "ticks"
    context.lineWidth = 1;
    context.beginPath();
    x.domain().forEach(d => {
      var bookOffset = this.getBookOffset(d);
      var xPos = leftMargin + bookOffset + x(d) + x.bandwidth() / 2;
      context.moveTo(xPos, height + topMargin);
      context.lineTo(xPos, height + 6 + topMargin);
    });
    context.strokeStyle = "black";
    context.stroke();
  }
  drawXAxisLine(context, height) {
    context.lineWidth = 4;
    context.beginPath();
    context.moveTo(leftMargin, height + topMargin + 2);
    context.lineTo(canvasWidth, height + topMargin + 2);
    context.strokeStyle = "black";
    context.stroke();
  }
  drawXAxisLabels(context, x, height) {
    // X-axis labels (character/chapter names)
    context.textAlign = "left";
    context.textBaseline = "top";
    context.font = axisLabelFontSize + "px Arial";

    console.log("drawing x axis label");
    x.domain().forEach(d => {
      context.translate(0, 0); // make sure we're back here before rotating
      context.save();

      context.rotate(Math.PI / 2); // turn the paper anticlockwise
      context.fillText(
        this.props.lookupXAxisLabel(d),
        height + topMargin + 8, // our y value for the location we want is now "x" here (will match up when we rotate paper backwards)
        -(
          leftMargin +
          x(d) +
          this.getBookOffset(d) +
          axisLabelFontSize / 2 +
          x.bandwidth() / 2
        ) // the negative of our x value is now our "y"
      );
      context.restore();
    });
  }

  drawYAxisTicks(context, yTicks, y) {
    // y-axis "ticks" delineating axis
    context.lineWidth = 1;
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
    context.lineWidth = 4;
    context.moveTo(leftMargin, topMargin);
    context.lineTo(leftMargin, height + topMargin + 4); // 4 for linewidth
    context.strokeStyle = "black";
    context.stroke();
  }
  drawYAxisLabels(context, yTicks, y) {
    // y-axis scale labels
    context.textAlign = "right";
    context.textBaseline = "middle";
    context.font = axisLabelFontSize + "px Arial";
    yTicks.forEach(function(d) {
      context.fillText(d, leftMargin - 10, y(d) + topMargin);
    });

    context.textAlign = "center";
    context.fillText("# Occurrences", leftMargin + 5, topMargin - 30);
  }

  drawBars(context, data, x, y, chartHeight) {
    elements = [];
    // Bars
    context.fillStyle = "steelblue";

    var width = x.bandwidth();
    var diff = 0;
    if (width > MaxBarWidth) {
      // if we're limiting the bar width we need to adjust the left position to account for the difference
      diff = width - MaxBarWidth;
      width = MaxBarWidth;
    }

    Object.keys(data).forEach(d => {
      var el = {
        char: d,
        left: this.getBarLeft(x, d, width),
        top: y(data[d]) + topMargin,
        width: width,
        height: chartHeight - y(data[d])
      };
      elements.push(el);

      context.fillRect(el.left, el.top, el.width, el.height);
    });

    // console.log("bars drawn: ");
    // console.log("x.bandwidth() " + x.bandwidth());
    // console.log("width: " + width);
    // console.log("bar padding: " + 0.05 * x.bandwidth());
    // console.log("x(5): " + x("5"));
    console.log(elements);
  }

  getBarLeft(x, d) {
    var bookOffset = this.getBookOffset(d);

    var width = x.bandwidth();
    var diff = 0;
    if (width > MaxBarWidth) {
      // if we're limiting the bar width we need to adjust the left position to account for the difference
      diff = width - MaxBarWidth;
      width = MaxBarWidth;
    }

    return x(d) + bookOffset + leftMargin + diff / 2;
  }
}

export default Graph;
