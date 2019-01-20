import React, { Component } from "react";
import * as d3 from "d3";
import * as _ from "underscore";
import { capitalise } from "./utils";

class WordChoice extends Component {
    render() {
        return (
            <div className={this.getClass()} onClick={() => this.props.onClick(this.props.word.word)}>
                {this.props.word.DisplayName}
            </div>
        );
    }

    getClass() {
        return "word-choice " + this.props.word.CssClass;
    }
}

export default WordChoice;
