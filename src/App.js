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
import capitalise from "./utils";

const initialState = {
  word: "",
  filterByChar: "",
  filterByBook: "",
  groupBy: "pov"
};

const bookWikiNames = {
  AGOT: "A_Game_of_Thrones",
  ACOK: "A_Clash_of_Kings",
  ASOS: "A_Storm_of_Swords",
  AFFC: "A_Feast_for_Crows",
  ADWD: "A_Dance_with_Dragons"
};

const epilogueChapters = {
  224: true,
  343: true
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
        <GraphContainer
          reset={() => this.setState(initialState)}
          word={this.state.word}
          breakdown={this.state.filterByChar}
          data={this.getData()}
          chapterLimits={this.getChapterLimits()}
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

  getWikiURLFunction() {
    var base = "https://awoiaf.westeros.org/index.php/";
    return w => {
      var chapter = _.find(chapterData["default"], c => c.id == w);
      var bookPart = bookWikiNames[chapter.book];
      var chapterPart =
        chapter.seq == 1
          ? "-Prologue"
          : epilogueChapters[chapter.id]
          ? "-Epilogue"
          : "-Chapter_" + (chapter.seq - 1); //seq starts at 0

      window.open(base + bookPart + chapterPart);
    };
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
      return this.getWikiURLFunction();
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
      return x => x;
    }
  }
}

export default App;
