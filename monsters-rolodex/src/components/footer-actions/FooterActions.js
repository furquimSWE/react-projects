import { Component } from "react";

import "./styles.scss";
import { advance, back } from "../../helpers/navigation";
import { Button } from "../button/Button";

export class FooterActions extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="footer-actions--container">
        <div className={`backward ${this.props.step === 1 ? "hide" : ""}`}>
          <Button
            text="Voltar"
            onClick={() => back(this.props.instance)}
            secondary
          />
        </div>
        <div className="forward">
          <Button
            text="Avançar"
            disabled={!this.props.valid}
            onClick={() => advance(this.props.instance)}
          />
        </div>
      </div>
    );
  }
}
