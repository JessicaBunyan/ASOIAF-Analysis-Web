import React, { Component } from "react";
import * as d3 from "d3";
import * as _ from "underscore";
import BackButton from "./BackButton";
import ResetButton from "./ResetButton";

class ControlPanel extends Component {
    render() {
        var backBtn = this.props.showBackButton ? (
            <BackButton back={() => this.props.back()} />
        ) : (
            <BackButton back={() => this.props.reset()} />
        );

        var resetBtn = this.props.showBackButton ? <ResetButton reset={() => this.props.reset()} /> : null;

        return (
            <div className="control-panel">
                {resetBtn}
                {backBtn}
            </div>
        );
    }
}

export default ControlPanel;
