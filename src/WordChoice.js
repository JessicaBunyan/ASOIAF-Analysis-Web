import React, { Component } from "react";
import * as d3 from "d3";
import * as _ from "underscore";
import { capitalise } from "./utils";

class WordChoice extends Component {
    render() {
        return (
            <div className={this.getClass()} onClick={() => this.props.onClick(this.props.word)}>
                {capitalise(this.props.word)}
            </div>
        );
    }

    getClass() {
        var word = this.props.word.toLowerCase();
        if (word === "ice" || word === "the wall") {
            return "word-choice blue";
        }
        return "word-choice ";
    }
}

export default WordChoice;
