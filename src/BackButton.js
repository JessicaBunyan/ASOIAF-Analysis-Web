import React, { Component } from "react";
import * as d3 from "d3";
import * as _ from "underscore";

class BackButton extends Component {
  render() {
    return (
      <div className="back-button" onClick={() => this.props.back()}>
        <i className="fas fa-long-arrow-alt-left" />
        back
      </div>
    );
  }
}

export default BackButton;
