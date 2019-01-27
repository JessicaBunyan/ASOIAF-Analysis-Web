import React, { Component } from "react";
import memoize from "memoize-one";
import * as d3 from "d3";
import * as _ from "underscore";
import { capitalise } from "./utils";
import Canvas from "./Canvas";

const singleBookOffset = 20;
const barPadding = 0.05;
const MaxBarWidth = 80;
const leftMargin = 80;
const topMargin = 10;
const axisLabelFontSize = 20;

var elements = [];

const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 800;

class Graph extends Component {
    constructor(props) {
        super(props);
        this.state = { test: 0 };
    }

    getChart = memoize(props => this.createBarChart(props));

    render() {
        var chart = this.getChart(this.props);

        return (
            <div className="canvasWrapper">
                <Canvas
                    width={CANVAS_WIDTH}
                    height={CANVAS_HEIGHT}
                    y={chart.y}
                    x={chart.x}
                    yTicks={chart.yTicks}
                    xTickLocations={chart.xAxisTickLocations}
                    bars={chart.bars}
                    xAxisLabels={chart.xAxisLabels}
                    onClickCallback={this.props.onClickCallback}
                />
            </div>
        );
    }

    createBarChart(props) {
        var data = this.props.data;

        var margin = { top: 20, right: 20, bottom: 300, left: 60 },
            width = CANVAS_WIDTH - margin.left - margin.right,
            height = CANVAS_HEIGHT - margin.top - margin.bottom;

        // if we're breaking down by chapter allow room for gaps between books
        width = this.props.breakdown ? width - 4 * singleBookOffset : width;

        console.log(width);
        console.log(height);
        console.log(barPadding);

        var x = d3
            .scaleBand()
            .rangeRound([0, width])
            .padding(barPadding);

        var y = d3.scaleLinear().rangeRound([height, 0]);

        var keys = Object.keys(data);
        var max = _.max(data);
        console.log(max);

        var yAxisLimit = this.getYAxisLimit(max);

        console.log("7axislimit: " + yAxisLimit);
        x.domain(keys);
        y.domain([0, yAxisLimit]);

        var yTickCount = this.getYTickCount(max);

        console.log("Y TICK COUNT: " + yTickCount);
        var yTicks = y.ticks(yTickCount);
        // this.drawXAxisTicks(context, x, height);
        // this.drawXAxisLine(context, height);
        // this.drawXAxisLabels(context, x, height);

        // this.drawYAxisTicks(context, yTicks, y);
        // this.drawYAxisLine(context, height);
        // this.drawYAxisLabels(context, yTicks, y);

        // this.drawBookBoundaries(context, x, width, height);
        var bars = this.calculateBars(x, y, data, height);

        var xAxisTickLocations = this.getXAxisTickLocations(x, height);

        var xAxisLabels = x.domain().map(e => this.props.lookupXAxisLabel(e));

        return {
            bars: bars,
            x: x,
            y: y,
            yTicks: yTicks,
            xAxisTickLocations: xAxisTickLocations,
            xAxisLabels: xAxisLabels,
            readyToDraw: true
        };
    }

    calculateBars(x, y, data, chartHeight) {
        elements = [];
        // Bars

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
        });

        return elements;
    }

    getChaptersPerBook() {
        var dataKeys = Object.keys(this.props.data);

        console.log(dataKeys);
        console.log(dataKeys.length);
        var chapterLimits = this.props.chapterLimits;

        var bookInfo = {
            0: [], // handy fillin for looping and comparing to prev
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

    getXAxisTickLocations(x, height) {
        var points = [];
        console.log("drawing x axis label");
        x.domain().forEach(d => {
            var bookOffset = this.getBookOffset(d);
            var xPos = leftMargin + bookOffset + x(d) + x.bandwidth() / 2;
            points.push(xPos);
        });
        return points;
    }

    getYAxisLimit(max) {
        var roundToNearest = max < 10 ? max : max < 20 ? 2 : max < 40 ? 5 : max < 200 ? 10 : 25;
        var yAxisLimit = Math.ceil(max / roundToNearest) * roundToNearest;
        return yAxisLimit;
    }

    getYTickCount(max) {
        var yTickCount;
        yTickCount = Math.ceil(
            max < 10 ? max : max < 20 ? max / 2 : max < 40 ? max / 5 : max < 200 ? max / 10 : max / 25
        );

        return yTickCount;
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
