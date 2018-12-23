import React, { Component } from "react";
import * as d3 from "d3";
import * as _ from "underscore";
import WordChoice from "./WordChoice";
import ResetButton from "./ResetButton";
import Graph from "./graph";

class Key extends Component {
  render() {
    if (!this.props.breakdown) {
      return null;
    }
    return (
      <div className="key">
        <div className="key-color blue"> </div> <div>A Game Of Thrones </div>
      </div>
    );
  }
}

export default Key;
