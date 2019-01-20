import React, { Component } from "react";
import * as _ from "underscore";
import { bookNameFromCode } from "./utils";
import $ from "jquery";

class Synopsis extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="synopsis">
                <div className="synopsis-header">
                    <h3 className="synopsis-title">
                        {this.props.chapterTitle + " Synopsis (" + bookNameFromCode(this.props.book) + ")"}
                    </h3>
                    <h3 className="">
                        <a href={this.props.url} target="_blank">
                            <span className="wiki-link">
                                <i className="fas fa-external-link-alt" /> A Wiki of Ice and Fire
                            </span>
                        </a>
                    </h3>
                </div>
                {this.props.paragraphs.map((para, index) => {
                    return <p key={index}>{para}</p>;
                })}
                <div className="synopsis-footer">
                    Chapter Synopsis from <a href="https://awoiaf.westeros.org/">A Wiki of Ice and Fire</a>. Licensed{" "}
                    <a href="https://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA</a>
                </div>
            </div>
        );
    }
}

export default Synopsis;
