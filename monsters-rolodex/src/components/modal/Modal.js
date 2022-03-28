import { Component } from "react";

import { MdClose } from 'react-icons/md'
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

          </span>
          <span className="close-icon">
            <MdClose />
          </span>
        </div>
      </div>
    );
  }
}
