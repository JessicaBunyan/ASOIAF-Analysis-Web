import React, { Component } from "react";
import * as d3 from "d3";
import * as _ from "underscore";
import WordChoice from "./Button";
import ResetButton from "./ResetButton";
import Graph from "./graph";
import BackButton from "./BackButton";
import ControlPanel from "./ControlPanel";
import { capitalise } from "./utils";
import Breakdown from "./Breakdown";

class GraphContainer extends Component {
    render() {
        return (
            <div className="graph-container">
                <ControlPanel
                    showBackButton={this.props.breakdown ? true : false}
                    back={this.props.back}
                    reset={this.props.reset}
                />
                <div className="graph clearfix">
                    <Breakdown
                        word={this.props.word}
                        breakdownText={this.getBreakdownText()}
                        occurrencesText={this.getTotalOccurrences()}
                        toggleNormalise={this.props.toggleNormalise}
                        areScoresNormalised={this.props.areScoresNormalised}
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
            </div>
        );
    }

    getBreakdownText() {
        if (this.props.breakdown) {
            return "By " + capitalise(this.props.breakdown) + " Chapter";
        }

        return "By PoV Character";
    }

    getTotalOccurrences() {
        if (this.props.areScoresNormalised) {
            return (
                <span>
                    Frequency per 10,000 words
                    <sup className="normalised-scores-explanation">
                        ?
                        <div className="tooltip-text">
                            How many times the word would appear if each character or chapter had exactly 10,000 words
                        </div>
                    </sup>
                </span>
            );
        }

        var count = 0;
        Object.keys(this.props.data).forEach(k => {
            count += this.props.data[k];
        });

        return <span>{count} occurrences</span>;
    }
}

export default GraphContainer;
