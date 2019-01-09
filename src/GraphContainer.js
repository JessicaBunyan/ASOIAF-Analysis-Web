import React, { Component } from "react";
import * as d3 from "d3";
import * as _ from "underscore";
import WordChoice from "./WordChoice";
import ResetButton from "./ResetButton";
import Graph from "./graph";
import BackButton from "./BackButton";
import ControlPanel from "./ControlPanel";

class GraphContainer extends Component {
  render() {
    return (
      <div className="graph-container">
        <ControlPanel
          showBackButton={this.props.breakdown ? true : false}
          back={this.props.back}
          reset={this.props.reset}
        />
        <Graph
          word={this.props.word}
          breakdown={this.props.breakdown}
          data={this.props.data}
          chapterLimits={this.props.chapterLimits}
          lookupXAxisLabel={this.props.lookupXAxisLabel}
          onClickCallback={this.props.onClickCallback}
        />
      </div>
    );
  }
}

export default GraphContainer;
