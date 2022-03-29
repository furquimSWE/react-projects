import { Component } from "react";

import { MdClose } from "react-icons/md";

import error from "../../assets/modal/erro.svg";
import { Button } from "../button/Button";

import "./styles.scss";

export default class Modal extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="modal--container">
        <div className="header">
          <span className="error-icon">
            <img src={error} alt="Icone de erro"></img>
          </span>
          <span className="close-icon">
            <MdClose onClick={this.props.onClose}/>
          </span>
        </div>
        <div className="title">{this.props.title}</div>
        <div className="message">{this.props.message}</div>
        <div className="actions">
          <Button text={this.props.buttonText} onClick={this.props.onClick} />
        </div>
      </div>
    );
  }
}
