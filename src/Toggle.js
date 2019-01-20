import React, { Component } from "react";
import * as d3 from "d3";
import * as _ from "underscore";
import WordChoice from "./WordChoice";

class Toggle extends Component {
    render() {
        return (
            <div className="toggle">
                <h4 onClick={() => this.props.toggleAction()}>{this.props.toggleText}</h4>
            </div>
        );
    }
}

export default Toggle;
