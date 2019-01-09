import React, { Component } from "react";
import * as d3 from "d3";
import * as _ from "underscore";

class ResetButton extends Component {
  render() {
    return (
      <div className="reset-button" onClick={() => this.props.reset()}>
        <i className="fas fa-long-arrow-alt-left" />
        back
      </div>
    );
  }
}

export default ResetButton;
