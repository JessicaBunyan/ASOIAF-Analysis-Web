import React, { Component } from "react";
import * as _ from "underscore";
import capitalise from "./utils";
import $ from "jquery";

class Synopsis extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="synopsis">
        {this.props.paragraphs.map(para => {
          return <p>{para}</p>;
        })}
      </div>
    );
  }
}

export default Synopsis;
