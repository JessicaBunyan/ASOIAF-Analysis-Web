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
            filterByChar: "",
            filterByBook: "",
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

    console.log(refs);
    console.log(this.state.filterByChar);
    if (this.state.filterByChar){
        refs = _.where(refs, {pov: this.state.filterByChar})
    }

    if (this.state.filterByBook){
        refs = _.where(refs, {book: this.state.filterByBook})
    }
    console.log("filtered");
    console.log(refs);

    var groupedRefs = _.countBy(refs, this.state.sortBy);
    return groupedRefs
  }

}

export default App;
