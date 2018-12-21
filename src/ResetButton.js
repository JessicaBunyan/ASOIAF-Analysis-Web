import React, { Component } from "react";
import * as d3 from "d3";
import * as _ from "underscore";

const leftMargin = 30;
const topMargin = 10;
var elements = [];

class ResetButton extends Component {
  render() {
    return (
      <div className="reset-button" onClick={() => this.props.reset()}>
        <i className="fas fa-long-arrow-alt-left" />
      </div>
    );
  }
}

export default ResetButton;
