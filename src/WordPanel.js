import React, { Component } from "react";
import * as d3 from "d3";
import * as _ from "underscore";
import WordChoice from "./WordChoice";

class WordPanel extends Component {
  render() {
    return (
      <div className="word-panel clearfix">
        <h2>Choose a word or phrase</h2>
        {this.props.words.map(e => {
          return (
            <WordChoice key={e} word={e} onClick={w => this.props.onClick(w)} />
          );
        })}
      </div>
    );
  }
}
export default WordPanel;
