import React, { Component } from "react";
import * as _ from "underscore";
import capitalise from "./utils";

class WikiFrame extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <iframe
        id="wiki-frame"
        src="https://awoiaf.westeros.org/index.php/A_Dance_with_Dragons-Chapter_10"
      />
    );
  }
}

export default WikiFrame;
