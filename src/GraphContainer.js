import React, { Component } from "react";
import * as d3 from "d3";
import * as _ from "underscore";
import WordChoice from "./WordChoice";
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
                        breakdownText={this.getBreakdownText()}
                        toggleNormalise={this.props.toggleNormalise}
                        toggleText={this.getToggleText()}
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
            return this.getTotalOccurrences() + " by " + capitalise(this.props.breakdown) + " chapter";
        }

        return this.getTotalOccurrences() + " by PoV Character";
    }

    getTotalOccurrences() {
        if (this.props.normalisedScores) {
            return "Normalised word frequency";
        }

        var count = 0;
        Object.keys(this.props.data).forEach(k => {
            count += this.props.data[k];
        });

        return count + " occurrences, ";
    }

    getToggleText() {
        if (this.props.normalisedScores) {
            return "Show absolute occurrences";
        }

        return "show normalised scores";
    }
}

export default GraphContainer;
