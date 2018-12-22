import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import * as json from "./data.json";
import * as chapterData from "./chapters.json";
import * as d3 from "d3";
import * as _ from "underscore";
import Graph from "./graph";
import ResetButton from "./ResetButton";
import WordPanel from "./WordPanel";
import GraphContainer from "./GraphContainer";

const initialState = {
  word: "",
  filterByChar: "",
  filterByBook: "",
  groupBy: "pov"
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  render() {
    if (this.state.word) {
      return (
        <GraphContainer
          reset={() => this.setState(initialState)}
          word={this.state.word}
          data={this.getData()}
          lookupXAxisLabel={this.getXAxisLabelFunction()}
          onClickCallback={this.getOnClickCallback()}
        />
      );
    } else {
      var words = Object.keys(json["default"]);

      return (
        <WordPanel words={words} onClick={w => this.setState({ word: w })} />
      );
    }
  }

  getOnClickCallback() {
    if (this.state.groupBy == "pov") {
      return c => this.setState({ filterByChar: c, groupBy: "cid" });
    } else {
      return console.log;
    }
  }

  getData() {
    var refs = json["default"][this.state.word];

    console.log(refs);
    console.log(this.state.filterByChar);
    if (this.state.filterByChar) {
      refs = _.where(refs, { pov: this.state.filterByChar });
    }

    if (this.state.filterByBook) {
      refs = _.where(refs, { book: this.state.filterByBook });
    }
    console.log("filtered");
    console.log(refs);

    var groupedRefs = _.countBy(refs, this.state.groupBy);

    console.log("grouped");
    console.log(groupedRefs);
    groupedRefs = this.addEmptyChapters(groupedRefs);
    console.log("with empty chapters");
    console.log(groupedRefs);
    return groupedRefs;
  }

  addEmptyChapters(groupedRefs) {
    console.log("adding empty chapters");
    if (this.state.groupBy == "cid") {
      var chaptersForChar = _.where(chapterData["default"], {
        pov_character: this.state.filterByChar
      });
      var base = {};
      chaptersForChar.forEach(c => {
        base[c.id] = 0;
      });
      console.log(chaptersForChar);
      return Object.assign(base, groupedRefs);
    }

    return groupedRefs;
  }

  getXAxisLabelFunction() {
    var chapters = chapterData["default"];
    console.log(chapters);

    if (this.state.groupBy == "pov") {
      return x => x;
    }
    if (this.state.groupBy == "cid") {
      return x => chapters[x].title;
    }
  }
}

export default App;
