import React, { Component } from "react";
import * as d3 from "d3";
import * as _ from "underscore";
import WordChoice from "./WordChoice";
import Toggle from "./Toggle";

class WordPanel extends Component {
    render() {
        return (
            <div className="word-panel clearfix">
                <h2>Choose a word or phrase</h2>
                {this.props.words.map(w => {
                    if (w.IsNSFW && !this.props.nsfwEnabled) {
                        return null;
                    }
                    return <WordChoice key={w.word} word={w} onClick={e => this.props.onClick(e)} />;
                })}
                <Toggle />
            </div>
        );
    }
}
export default WordPanel;
