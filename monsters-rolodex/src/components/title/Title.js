import { Component } from "react";
import "./styles.scss";

export class Title extends Component {
  constructor() {
    super();
  }

  render() {
    const { title, subtitle } = this.props;
    return (
      <div className="container">
        <span className="title">{title}</span>
        <span className="subtitle">{subtitle}</span>
      </div>
    );
  }
}
