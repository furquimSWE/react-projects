import { Component } from "react";

import "./styles.scss";
export class Button extends Component {
  render() {
    return (
      <button
        className={`button ${this.props.disabled ? "button--disabled" : ""} ${
          this.props.secondary ? "button--secondary" : "button--primary"
        } `}
        onClick={this.props.onClick}
      >
        {this.props.text}
      </button>
    );
  }
}
