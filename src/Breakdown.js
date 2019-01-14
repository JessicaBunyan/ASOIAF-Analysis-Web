import React, { Component } from "react";
import * as _ from "underscore";

class Breakdown extends Component {
    render() {
        return (
            <div className="breakdown">
                <h3 className="selected-word got-font">{this.props.word}</h3>
                <h4 className="breakdown ">{this.props.breakdownText}</h4>
                <h4 onClick={() => this.props.toggleNormalise()}>{this.props.toggleText}</h4>
            </div>
        );
    }
}

export default Breakdown;
