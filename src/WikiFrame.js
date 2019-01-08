import React, { Component } from "react";
import * as _ from "underscore";
import capitalise from "./utils";
import $ from "jquery";

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
    if (this.state.isLoaded || !this.props.url) {
      return;
    }
    $.get(
      "synopses/synopsis-test.html",
      "",
      data => {
        console.log("LOADED CONTENT");
        console.log(data);
        this.setState({ content: data, isLoaded: true });
      },
      "html"
    );
  }

  render() {
    if (!this.state.isLoaded) {
      return null;
    }

    return this.state.content;
  }
}

export default WikiFrame;
