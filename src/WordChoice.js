import React, { Component } from "react";
import * as d3 from "d3";
import * as _ from "underscore";

class WordChoice extends Component {
  render() {
    return (
      <div
        className="word-choice"
        onClick={() => this.props.onClick(this.props.word)}
      >
        {this.capitalise(this.props.word)}
      </div>
    );
  }
  capitalise(word) {
    return word.substring(0, 1).toUpperCase() + word.substring(1);
  }
}

export default WordChoice;
