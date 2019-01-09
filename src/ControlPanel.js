import React, { Component } from "react";
import * as d3 from "d3";
import * as _ from "underscore";
import BackButton from "./BackButton";
import ResetButton from "./ResetButton";

class ControlPanel extends Component {
  render() {
    var backBtn = this.props.showBackButton ? (
      <BackButton back={() => this.props.back()} />
    ) : null;
    var resetBtn = <ResetButton reset={() => this.props.reset()} />;
    return (
      <div className="control-panel">
        {backBtn}
        {resetBtn}
      </div>
    );
  }
}

export default ControlPanel;
