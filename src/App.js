import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as json from "./iceRefs.json";
import * as d3 from "d3";
import * as _ from "underscore";
import Graph from "./graph";


class App extends Component {


  render() {
    return (
      <div className="App">

        <Graph word="ice" data={json["default"]["ice"]}></Graph>
      </div>
    );
  }

}

export default App;
