import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as json from "./iceRefs.json";
import * as d3 from "d3";
import * as _ from "underscore";
import Graph from "./graph";
import ResetButton from "./ResetButton";
import WordChoice from "./WordChoice";

const initialState = {
    word: "",
    filterByChar: "",
    filterByBook: "",
    groupBy: "pov"
}

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            word: "",
            filterByChar: "",
            filterByBook: "",
            groupBy: "pov",
        }
    }

  render() {

    if (this.state.word){
        return this.renderGraph();
    } else{
        return this.renderWordSelection();
    }
    
  }
  renderWordSelection(){

    console.log(json["default"]);
    console.log();

    var words = Object.keys(json["default"]);

     return (
         <div className="word-list">
            {words.map(e => {
                return (<WordChoice word={e} onClick={(w) => this.setState({word: w})}/>)
            })}
         </div>
     )
  }

  renderGraph(){
    return (
        <div className="App">
          <ResetButton reset={() => this.setState(initialState)} />
  
          <Graph 
              word="ice" 
              data={this.getData()}
              onClickCallback={this.getOnClickCallback()}    
              />
        </div>
      );
  }

  getOnClickCallback(){
      if (this.state.groupBy == "pov"){
            return (c => this.setState({filterByChar: c, groupBy: "chapter"}))
        } else {
            return console.log;
        }
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

    var groupedRefs = _.countBy(refs, this.state.groupBy);
    return groupedRefs
  }

}

export default App;
