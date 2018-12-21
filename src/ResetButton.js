import React, { Component } from 'react';
import * as d3 from "d3";
import * as _ from "underscore";


    const leftMargin = 30;
    const topMargin = 10;
    var elements = [];

class ResetButton extends Component{

    

      render(){
        return (
        <div onClick={() => this.props.reset()}>
            back
        </div>
        )  
    }

    }


export default ResetButton;