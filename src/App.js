import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as json from "./iceRefs.json";
import * as d3 from "d3";
import * as _ from "underscore";
import Graph from "./graph";


class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            word: "ice",
            sortBy: "pov"
        }
    }

  render() {
    return (
      <div className="App">

        <Graph word="ice" data={this.getData()}></Graph>
      </div>
    );
  }

  getData(){
    var refs = json["default"][this.state.word];

    var refsByPov = _.countBy(refs, this.state.sortBy);
    return refsByPov
  }

}

export default App;
