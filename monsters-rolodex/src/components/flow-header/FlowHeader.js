import { Component } from "react";
import "./styles.scss";

import { store } from "../../store";

import { Pill } from "../pill/Pill";

export class FlowHeader extends Component {
  constructor() {
    super();

    let { flow } = store.getState();

    this.state = {
      currentStep: flow.currentStep,
      totalSteps: flow.totalSteps,
      steps: flow.steps,
    };
  }

  componentDidMount() {
    store.subscribe(() => {
      let { flow } = store.getState();
      this.setState({...flow});
    });
  }

  render() {
    return (
      <div className="flow-header--container">
        <span className="flow-header--etapa">
          Etapa {this.state.currentStep} de {this.state.totalSteps}
        </span>
        <div className="flow-header-pill--container">
          {this.state.steps.map((step, index) => {
            return (
              <Pill
                active={index === this.state.currentStep - 1}
                icon={step.icon}
                label={step.label}
                header
                key={`header-pill-${index}`}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
