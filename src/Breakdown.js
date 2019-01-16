import React, { Component } from "react";
import * as _ from "underscore";

class Breakdown extends Component {
    render() {
        return (
            <div className="breakdown">
                <h3 className="selected-word">
                    <span className="got-font">{this.props.word}</span>, {this.props.breakdownText}
                </h3>
                <h4 className="breakdown ">{this.props.occurrencesText}</h4>
                <div className="normalise-toggle">
                    <h4 onClick={() => this.props.toggleNormalise()}>{this.getToggleText()}</h4>
                </div>
            </div>
        );
    }

    getToggleText() {
        if (this.props.normalisedScores) {
            return "Show absolute occurrences";
        }

        return "Show normalised scores";
    }
}

export default Breakdown;
