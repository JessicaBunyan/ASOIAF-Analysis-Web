import React, { Component } from "react";
import * as d3 from "d3";
import * as _ from "underscore";
import Toggle from "./Toggle";
import Button from "./Button";

class WordPanel extends Component {
    render() {
        return (
            <div className="word-panel clearfix">
                <h2>Choose a word or phrase</h2>
                {this.props.words.map((w, index) => {
                    if (w.IsNSFW && !this.props.nsfwEnabled) {
                        return null;
                    }
                    return (
                        <Button
                            key={index}
                            className={this.getClass(w)}
                            action={() => this.props.onClick(w.Word)}
                            text={w.DisplayName}
                        />
                    );
                })}
                <Toggle
                    action={this.props.toggleNSFWEnabled}
                    text={this.props.nsfwEnabled ? "hide NSFW words" : "show NSFW words"}
                />
            </div>
        );
    }

    getClass(word) {
        return "word-choice " + word.CssClass;
    }
}
export default WordPanel;
