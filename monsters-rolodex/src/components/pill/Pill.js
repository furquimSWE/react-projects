import { Component } from "react";

import "./styles.scss";

export class Pill extends Component {
  constructor() {
    super();
  }

  render() {
    if (this.props.header) {
      return (
        <span
          className={`pill ${
            this.props.active ? "pill--active" : "pill--inactive"
          }`}
        >
          <span className="icon">{this.props.icon}</span>
          <span className="label">{this.props.label}</span>
        </span>
      );
    } else {
      return (
        <span className="pill pill--default">
          <span className="label">{this.props.label}</span>
        </span>
      );
    }
  }
}
