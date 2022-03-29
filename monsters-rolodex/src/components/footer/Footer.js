import { Component } from "react";

import "./styles.scss";
import { advance, back } from "../../helpers/navigation";
import { Button } from "../button/Button";

export class Footer extends Component {
  constructor() {
    super();
  }

  render() {
    const { instance, step, stepKey, valid, legalTerms } = this.props;
    return (
      <div className="footer">
        <div className="legal-terms">{legalTerms}</div>
        <div className="divider" />
        <div className="actions">
          <div className={`backward ${step === 1 ? "hide" : ""}`}>
            <Button
              text="Voltar"
              onClick={() => back(instance, stepKey)}
              secondary
            />
          </div>
          <div className="forward">
            <Button
              text="Avançar"
              disabled={!valid}
              onClick={() => advance(instance, stepKey)}
            />
          </div>
        </div>
      </div>
    );
  }
}
