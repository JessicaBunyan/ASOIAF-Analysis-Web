import React, { Component } from "react";
import * as json from "./data.json";
import chapterData from "./chapters.json";
import * as _ from "underscore";
import WordPanel from "./WordPanel";
import GraphContainer from "./GraphContainer";
import SynopsisFrame from "./SynopsisFrame";
import $ from "jquery";

const chapterInfo = chapterData.chapterInfo;

const normalisationScaleFactor = 10000;

const initialState = {
    word: "",
    filterByChar: "",
    groupBy: "pov",
    cid: "",
    normalisedScores: false,
    nsfwEnabled: false
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
                        back={() => this.setState({ filterByChar: "", groupBy: "pov" })}
                        toggleNormalise={() => this.setState({ normalisedScores: !this.state.normalisedScores })}
                        areScoresNormalised={this.state.normalisedScores}
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
            var words = json["default"];

            return (
                <WordPanel
                    nsfwEnabled={this.state.nsfwEnabled}
                    toggleNSFWEnabled={() => this.setState({ nsfwEnabled: !this.state.nsfwEnabled })}
                    words={words}
                    onClick={w => this.setState({ word: w })}
                />
            );
        }
    }

    getChapterLimits() {
        return {
            0: -1, // handy fillin
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

    getTotalWords(key) {
        console.log("IN GET TOTAL WORDS");
        if (!this.state.filterByChar) {
            var chaptersForThisChar = _.where(chapterInfo, { pov_character: key });
            var wordsTotal = 0;

            console.log(chaptersForThisChar);
            chaptersForThisChar.forEach(c => {
                wordsTotal += c.words;
            });

            return wordsTotal;
        }

        return chapterInfo[key].words;
    }

    getData() {
        // var refs = json["default"][this.state.word];

        var refs = _.find(json["default"], r => r.Word.toLowerCase() === this.state.word.toLowerCase()).References;

        if (this.state.filterByChar) {
            refs = _.where(refs, { pov: this.state.filterByChar });
        }

        var groupedRefs = _.countBy(refs, this.state.groupBy);

        if (this.state.normalisedScores) {
            Object.keys(groupedRefs).forEach(k => {
                groupedRefs[k] = (groupedRefs[k] * normalisationScaleFactor) / this.getTotalWords(k);
            });
        }

        groupedRefs = this.addEmptyChapters(groupedRefs);
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
            return x => x.split("\r\n");
        }
        if (this.state.groupBy == "cid") {
            return x => chapters[x].title.split("\r\n");
        }
    }
}

export default App;
