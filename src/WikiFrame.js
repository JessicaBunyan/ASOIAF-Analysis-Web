import React, { Component } from "react";
import * as _ from "underscore";
import capitalise from "./utils";
import $ from "jquery";
import Synopsis from "./Synopsis";
import chapterData from "./chapters.json";

const chapterInfo = chapterData.chapterInfo;

const initialState = {
  isLoaded: false,
  content: ""
};

class WikiFrame extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidUpdate() {
    console.log("in component did update");
    console.log("====================");
    console.log(this.props.url);
    if (this.state.isLoaded || !this.props.cid) {
      return;
    }
    $.get(
      "synopses/synopsis-test.json",
      "",
      data => {
        console.log("LOADED CONTENT");
        var content = JSON.parse(data);
        console.log(content);
        console.log(content.paragraphs);
        this.setState({ content: content.paragraphs, isLoaded: true });
      },
      "html"
    );
  }

  render() {
    if (!this.state.isLoaded || !this.props.cid) {
      return null;
    }

    return (
      <Synopsis
        paragraphs={this.state.content}
        chapterTitle={chapterInfo[this.props.cid].title}
        book={chapterInfo[this.props.cid].book}
      />
    );
  }
}

export default WikiFrame;
