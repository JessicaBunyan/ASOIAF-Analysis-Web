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
        <div className="row">
          <div className="key-color blue"> </div> <div>A Game of Thrones </div>
        </div>
        <div className="row">
          <div className="key-color green"> </div> <div>A Clash of Kings </div>
        </div>
        <div className="row">
          <div className="key-color yellow"> </div>{" "}
          <div>A Storm of Swords </div>
        </div>
        <div className="row">
          <div className="key-color red"> </div> <div>A Feast For Crows </div>
        </div>{" "}
        <div className="row">
          <div className="key-color white"> </div>
          <div>A Dance With Dragons </div>
        </div>
      </div>
    );
  }
}

export default Key;
