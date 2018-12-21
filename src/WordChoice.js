import React, { Component } from 'react';
import * as d3 from "d3";
import * as _ from "underscore";



class WordChoice extends Component{

    

      render(){
        return (
        <div className="word-choice" onClick={() => this.props.onClick(this.props.word)}>
            {this.props.word}
        </div>
        )  
    }

    }


export default WordChoice;