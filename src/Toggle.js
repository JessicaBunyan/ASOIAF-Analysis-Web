import React, { Component } from "react";
import * as d3 from "d3";
import * as _ from "underscore";
import WordChoice from "./WordChoice";

const Toggle = ({ toggleAction, toggleText }) => {
    return (
        <div className="toggle">
            <h4 onClick={() => toggleAction()}>{toggleText}</h4>
        </div>
    );
};

export default Toggle;
