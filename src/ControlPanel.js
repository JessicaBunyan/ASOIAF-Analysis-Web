import React, { Component } from "react";
import Button from "./Button";

class ControlPanel extends Component {
    render() {
        var backBtnAction = this.props.showBackButton ? this.props.back : this.props.reset;

        var backBtn = (
            <Button className="back-button" action={() => backBtnAction()}>
                <i className="fas fa-long-arrow-alt-left" />
            </Button>
        );

        var resetBtn = this.props.showBackButton ? (
            <Button className="reset-button" action={() => this.props.reset()}>
                <i className="fas fa-undo-alt" />
            </Button>
        ) : null;

        return (
            <div className="control-panel">
                {resetBtn}
                {backBtn}
            </div>
        );
    }
}

export default ControlPanel;
