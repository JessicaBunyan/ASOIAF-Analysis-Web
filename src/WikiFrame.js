import React, { Component } from "react";
import * as _ from "underscore";
import capitalise from "./utils";

class WikiFrame extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.state.url) {
      return <div id="wiki-frame" />;
    } else {
      return null;
    }
  }
}

export default WikiFrame;
