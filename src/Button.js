import React, { Component } from "react";
import * as d3 from "d3";
import * as _ from "underscore";
import { capitalise } from "./utils";

const Button = ({ className, action, text }) => (
    <div className={className} onClick={() => action()}>
        {text}
    </div>
);

export default Button;
