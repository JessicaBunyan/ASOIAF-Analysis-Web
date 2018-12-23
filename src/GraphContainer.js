import React, { Component } from "react";
import * as d3 from "d3";
import * as _ from "underscore";
import WordChoice from "./WordChoice";
import ResetButton from "./ResetButton";
import Graph from "./graph";
import Key from "./Key";

class GraphContainer extends Component {
  render() {
    return (
      <div className="graph-container">
        <ResetButton reset={() => this.props.reset()} />
        <div className="padding clearfix" />
        <Graph
          word={this.props.word}
          breakdown={this.props.breakdown}
          data={this.props.data}
          chapterLimits={this.props.chapterLimits}
          lookupXAxisLabel={this.props.lookupXAxisLabel}
          onClickCallback={this.props.onClickCallback}
        />
        <div className="padding clearfix">
          <Key breakdown={this.props.breakdown} />
        </div>
      </div>
    );
  }
}

export default GraphContainer;
