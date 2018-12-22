import React, { Component } from "react";
import * as d3 from "d3";
import * as _ from "underscore";
import WordChoice from "./WordChoice";
import ResetButton from "./ResetButton";
import Graph from "./graph";

class GraphContainer extends Component {
  render() {
    return (
      <div className="graph-container">
        <ResetButton reset={() => this.props.reset()} />

        <Graph
          word={this.props.word}
          data={this.props.data}
          lookupXAxisLabel={this.props.lookupXAxisLabel}
          onClickCallback={this.props.onClickCallback}
        />
      </div>
    );
  }
}

export default GraphContainer;
