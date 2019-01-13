import React, { Component } from "react";
import * as d3 from "d3";
import * as _ from "underscore";
import { capitalise } from "./utils";

class WordChoice extends Component {
    render() {
        return (
            <div
                className="word-choice"
                onClick={() => this.props.onClick(this.props.word)}
            >
                {capitalise(this.props.word)}
            </div>
        );
    }
}

export default WordChoice;
