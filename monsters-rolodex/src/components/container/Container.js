import { Component } from "react";

import { PersonalData, VehicleData, ResultData } from "../../pages/steps";

import "./styles.scss";
import { FlowHeader } from "../flow-header/FlowHeader";

import { store } from "../../store/index";

export class Container extends Component {
  constructor() {
    super();

    let { flow } = store.getState();

    this.state = {
      ...flow,
    };
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      let { flow } = store.getState();
      this.setState(
        () => {
          return {
            ...flow,
          };
        },
        () => {}
      );
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  // to-do -> link data between steps using the state in this component
  render() {
    let element;
    const { currentStep } = this.state;

    if (currentStep === 1) {
      element = <PersonalData />;
    } else if (currentStep === 2) {
      element = <VehicleData />;
    } else if (currentStep === 3) {
      element = <ResultData />;
    } else {
      element = <div></div>;
    }

    return (
      <div className="flow-container">
        <div className="flow-header">
          <FlowHeader />
        </div>
        <div className="flow-step">{element}</div>
      </div>
    );
  }
}
