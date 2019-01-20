import React, { Component } from "react";
import * as _ from "underscore";
import Toggle from "./Toggle";

class Breakdown extends Component {
    render() {
        return (
            <div className="breakdown">
                <h3 className="selected-word">
                    <span className="got-font">{this.props.word}</span>, {this.props.breakdownText}
                </h3>
                <h4 className="breakdown ">{this.props.occurrencesText}</h4>
                <Toggle toggleAction={this.props.toggleNormalise} toggleText={this.getToggleText()} />
            </div>
        );
    }

    getToggleText() {
        if (this.props.areScoresNormalised) {
            return "Show absolute occurrences";
        }

        return "Show normalised scores";
    }
}

export default Breakdown;
