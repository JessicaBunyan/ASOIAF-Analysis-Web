import React, { Component } from "react";
import * as _ from "underscore";
import { bookNameFromCode } from "./utils";
import $ from "jquery";

class Synopsis extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="synopsis">
        <h3>
          {this.props.chapterTitle +
            " Synopsis (" +
            bookNameFromCode(this.props.book) +
            ")"}
        </h3>
        {this.props.paragraphs.map(para => {
          return <p>{para}</p>;
        })}
        <div class="synopsis-footer">
          Chapter Synopsis from{" "}
          <a href="https://awoiaf.westeros.org/">A Wiki of Ice and Fire</a>.
          Licensed{" "}
          <a href="https://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA</a>
        </div>
      </div>
    );
  }
}

export default Synopsis;
