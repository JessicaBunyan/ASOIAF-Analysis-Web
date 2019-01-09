import React, { Component } from "react";
import logo from "./logo.svg";
import "./reset.css";
import "./App.css";
import * as json from "./data.json";
import chapterData from "./chapters.json";
import * as d3 from "d3";
import * as _ from "underscore";
import Graph from "./graph";
import ResetButton from "./ResetButton";
import WordPanel from "./WordPanel";
import GraphContainer from "./GraphContainer";
import { getWikiURL } from "./utils";
import SynopsisFrame from "./SynopsisFrame";
import $ from "jquery";

const chapterInfo = chapterData.chapterInfo;

const initialState = {
  word: "",
  filterByChar: "",
  filterByBook: "",
  groupBy: "pov",
  cid: ""
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidUpdate() {
    if (this.state.word) {
      // not very react-y but it works
      document.getElementsByTagName("body")[0].classList.add("active");
    }
  }

  render() {
    if (this.state.word) {
      return (
        <div>
          <GraphContainer
            reset={() => this.setState(initialState)}
            word={this.state.word}
            breakdown={this.state.filterByChar}
            data={this.getData()}
            chapterLimits={this.getChapterLimits()}
            lookupXAxisLabel={this.getXAxisLabelFunction()}
            onClickCallback={this.getOnClickCallback()}
          />
          <SynopsisFrame cid={this.state.cid} />
        </div>
      );
    } else {
      var words = Object.keys(json["default"]);

      return (
        <WordPanel words={words} onClick={w => this.setState({ word: w })} />
      );
    }
  }

  getChapterLimits() {
    return {
      0: 0, // handy fillin
      1: 72, // AGOT has 72 chapters
      2: 142, // ACOK is chapters 73-142 etc
      3: 224,
      4: 270,
      5: 343
    };
  }

  getOnClickCallback() {
    if (this.state.groupBy == "pov") {
      return c => this.setState({ filterByChar: c, groupBy: "cid" });
    } else {
      return cid => {
        this.setState({ cid: cid });
        window.setTimeout(() => {
          $("html, body").animate({ scrollTop: 1000 }, 500);
        }, 500);
      };
      return;
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
      var chaptersForChar = _.where(chapterInfo, {
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
    var chapters = chapterInfo;
    console.log(chapters);

    if (this.state.groupBy == "pov") {
      return x => x;
    }
    if (this.state.groupBy == "cid") {
      return x => chapters[x].title;
      return x => x;
    }
  }
}

export default App;
