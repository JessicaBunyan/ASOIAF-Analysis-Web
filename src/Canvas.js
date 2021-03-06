import React, { Component } from "react";
import * as d3 from "d3";
import settings from "./Settings";

const bookColours = [
    "",
    "rgba(0,0,255,0.4)",
    "rgba(255,255,0,0.4)",
    "rgba(0,255,0,0.4)",
    "rgba(255,0,0,0.4)",
    "rgba(255,255,255,0.4)"
];
const bookImgIds = ["", "agot-cover", "acok-cover", "asos-cover", "affc-cover", "adwd-cover"];
const bookImgLeftIds = ["", "agot-left", "acok-left", "asos-left", "affc-left", "adwd-left"];
const bookImgRightIds = ["", "agot-right", "acok-right", "asos-right", "affc-right", "adwd-right"];

class Canvas extends Component {
    componentDidMount() {
        this.drawChart();
        var canvas = document.querySelector("canvas");
        canvas.addEventListener("click", e => this.onChartClick(e));
        canvas.addEventListener("mousemove", e => this.onChartHover(e));
    }
    componentDidUpdate() {
        this.clearCanvas();
        this.drawChart();
    }

    render() {
        return <canvas width={this.props.width} height={this.props.height} />;
    }

    /**
     * returns the element the mouse is over, or false if its not over any
     * @param {} e event object
     */
    isMouseOverCanvasElement(e) {
        var canvas = document.querySelector("canvas");

        var bars = this.props.bars;

        var x = e.offsetX,
            y = e.offsetY;

        // Collision detection between clicked offset and bar.
        for (var i = 0; i < bars.length; i++) {
            var bar = bars[i];
            if (y >= bar.top && y <= bar.top + bar.height && x >= bar.left && x <= bar.left + bar.width) {
                return bar;
            }
        }

        return false;
    }

    onChartHover(e) {
        var canvas = document.querySelector("canvas");
        var context = canvas.getContext("2d");
        var hoveredElement = this.isMouseOverCanvasElement(e);
        if (hoveredElement) {
            this.drawBars(context);
            this.drawBar(context, hoveredElement, settings.highlightedBarOutline, settings.highlightedBarColour);
            canvas.style.cursor = "pointer";
        } else {
            this.drawBars(context);
            canvas.style.cursor = "auto";
        }
    }

    onChartClick(e) {
        var element = this.isMouseOverCanvasElement(e);
        if (element) {
            this.props.onClickCallback(element.char);
        }
    }

    clearCanvas() {
        var canvas = document.querySelector("canvas");
        var context = canvas.getContext("2d");
        context.clearRect(0, 0, 10000, 10000);
    }

    drawChart() {
        // var data = this.props.data;
        var canvas = document.querySelector("canvas"),
            context = canvas.getContext("2d");

        var margin = settings.margin,
            width = this.props.width - margin.left - margin.right,
            height = this.props.height - margin.top - margin.bottom;

        // if we're breaking down by chapter allow room for gaps between books
        width = this.props.breakdown ? width - 4 * settings.singleBookOffset : width;

        console.log("HEIGHT");
        console.log(height);

        context.fillStyle = "black";
        this.drawXAxisTicks(context, height);
        this.drawXAxisLine(context, height);
        this.drawXAxisLabels(context, height);
        //
        this.drawYAxisTicks(context);
        this.drawYAxisLine(context, height);
        this.drawYAxisLabels(context);

        this.drawBookBoundaries(context, width, height);
        this.drawBars(context);
    }

    drawBookBoundaries(context, canvasWidth, height) {
        if (this.props.bookBoundaries) {
            for (var book = 1; book < 6; book++) {
                this.drawBook(
                    context,
                    this.props.bookBoundaries,
                    book,
                    height + settings.margin.top + settings.margin.bottom
                );
            }

            context.fillStyle = "black";
            context.globalAlpha = 1;
        }
    }

    drawBook(context, bookBoundaries, bookNum, height) {
        var left = bookBoundaries[bookNum - 1];
        var width = bookBoundaries[bookNum] - left;
        left = left + settings.margin.left;

        context.fillStyle = bookColours[bookNum];
        var img = document.getElementById(bookImgIds[bookNum]);
        context.globalAlpha = 0.2;

        if (width <= settings.singleBookOffset + 2) {
            // If there are no chapters we just draw a coloured line/strip
            context.fillRect(left, 0, width, height);
        } else {
            if (width < 550) {
                // if its not too wide just draw the image as is
                context.fillStyle = "black";
                context.drawImage(
                    img,
                    0,
                    0,
                    settings.baseBookImgWidth,
                    settings.baseBookImgHeight,
                    left,
                    0,
                    width,
                    height
                );
            } else {
                // if its too wise we draw the image in the middle and "fill in" the sides
                var fillAreaWidth = (width - 550) / 2;
                var leftImg = document.getElementById(bookImgLeftIds[bookNum]);
                var rightImg = document.getElementById(bookImgRightIds[bookNum]);

                this.fillInBookSide(context, leftImg, left, fillAreaWidth, height);
                this.fillInBookSide(context, rightImg, left + 550 + fillAreaWidth, fillAreaWidth, height);

                context.drawImage(
                    img,
                    0,
                    0,
                    settings.baseBookImgWidth,
                    settings.baseBookImgHeight,
                    left + fillAreaWidth,
                    0,
                    550,
                    height
                );
            }
        }
        context.fillStyle = "black";
    }

    fillInBookSide(context, img, left, fillWidth, height) {
        for (var i = 0; i < fillWidth; i += 10) {
            var tileWidth = 10;
            if (i > fillWidth - 10) {
                // if we have less than 10 pixels to the end shorten the tile width so we don't overflow
                tileWidth = fillWidth - i;
            }
            context.drawImage(img, 0, 0, 10, 961, left + i, 0, tileWidth, height);
        }
    }

    drawXAxisTicks(context, height) {
        var xTickPos = this.props.xTickLocations;

        // X-axis "ticks"
        context.lineWidth = 1;
        context.beginPath();
        xTickPos.forEach(point => {
            console.log(point);
            context.moveTo(point, height + settings.margin.top);
            context.lineTo(point, height + 6 + settings.margin.top);
        });
        context.strokeStyle = "black";
        context.stroke();
    }
    drawXAxisLine(context, height) {
        context.lineWidth = 4;
        context.beginPath();
        context.moveTo(settings.margin.left, height + settings.margin.top + 2);
        context.lineTo(settings.canvasWidth, height + settings.margin.top + 2);
        context.strokeStyle = "black";
        context.stroke();
    }
    drawXAxisLabels(context, height) {
        // X-axis labels (character/chapter names)
        context.textAlign = "left";
        context.textBaseline = "top";

        this.props.xTickLocations.forEach((l, index) => {
            context.font = settings.axisLabelFontSize + "px Arial";
            var labelText = this.props.xAxisLabels[index];

            console.log("LABEL TEXT");
            console.log(labelText);
            var textHeight = settings.axisLabelFontSize;

            context.translate(0, 0); // make sure we're back here before rotating
            context.save();

            context.rotate(Math.PI / 2); // turn the paper anticlockwise

            if (labelText.length == 1) {
                context.fillText(labelText[0], height + settings.margin.top + 8, -l - textHeight / 2); // use y for x and -x for y due to paper rotation
            } else {
                textHeight = textHeight - 2;
                console.log("NEW FONT HEIGHT: " + textHeight);
                context.font = textHeight + "px Arial";
                context.fillText(labelText[0], height + settings.margin.top + 8, -l - textHeight); // use y for x and -x for y due to paper rotation
                context.fillText(labelText[1], height + settings.margin.top + 8, -l); // use y for x and -x for y due to paper rotation
            }

            context.restore();
        });
    }

    drawYAxisTicks(context) {
        var y = this.props.y;
        var yTicks = this.props.yTicks;
        // y-axis "ticks" delineating axis
        context.lineWidth = 1;
        context.beginPath();
        console.log("y ticks");
        console.log(yTicks);
        yTicks.forEach(function(d) {
            context.moveTo(settings.margin.left, y(d) + 0.5 + settings.margin.top);
            context.lineTo(settings.margin.left - 5, y(d) + 0.5 + settings.margin.top);
        });
        context.strokeStyle = "black";
        context.stroke();
    }
    drawYAxisLine(context, height) {
        // Vertical Axis (line)
        context.beginPath();
        context.lineWidth = 4;
        context.moveTo(settings.margin.left, settings.margin.top);
        context.lineTo(settings.margin.left, height + settings.margin.top + 4); // 4 for linewidth
        context.strokeStyle = "black";
        context.stroke();
    }
    drawYAxisLabels(context) {
        // y-axis scale labels
        var y = this.props.y;

        context.textAlign = "right";
        context.textBaseline = "middle";
        context.font = settings.axisLabelFontSize + "px Arial";
        this.props.yTicks.forEach(function(d) {
            context.fillText(d, settings.margin.left - 10, y(d) + settings.margin.top);
        });
    }

    drawBars(context) {
        this.props.bars.forEach(b => {
            this.drawBar(context, b, settings.barOutlineColour, settings.barColour);
        });
    }

    drawBar(context, el, colour, outline) {
        context.fillStyle = colour;
        context.fillRect(el.left, el.top, el.width, el.height);
        context.fillStyle = outline;
        context.fillRect(el.left + 1, el.top + 1, el.width - 2, el.height);
    }
}

export default Canvas;
