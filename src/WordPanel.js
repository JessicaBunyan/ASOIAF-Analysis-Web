import React, { Component } from "react";
import * as d3 from "d3";
import * as _ from "underscore";
import WordChoice from "./WordChoice";

class WordPanel extends Component {
    render() {
        return (
            <div className="word-panel clearfix">
                <h2>Choose a word or phrase</h2>
                {this.props.words.map(w => {
                    return <WordChoice key={w.word} word={w} onClick={e => this.props.onClick(e)} />;
                })}
            </div>
        );
    }
}
export default WordPanel;
