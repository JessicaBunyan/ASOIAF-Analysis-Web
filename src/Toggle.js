import React, { Component } from "react";
import * as d3 from "d3";
import * as _ from "underscore";
import WordChoice from "./Button";

const Toggle = ({ action, text }) => (
    <div className="toggle">
        <h4 onClick={() => action()}>{text}</h4>
    </div>
);

export default Toggle;
