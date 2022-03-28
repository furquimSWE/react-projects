import { Component } from "react";

import {
  FlowPersonalData,
  FlowVehicleData,
  FlowResultData,
} from "../flow-steps";

import "./styles.scss";

import { store } from '../../store/index';

export class FlowContainer extends Component {
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
      this.setState(() => {
        return {
          ...flow,
        }
      }, () => {
      })
    })
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  // to-do -> link data between steps using the state in this component
  render() {
    let element;
    let { currentStep } = this.state;

    if (currentStep === 1) {
      element = <FlowPersonalData />;
    } else if (currentStep === 2) {
      element = <FlowVehicleData />;
    } else if (currentStep === 3) {
      element = <FlowResultData />;
    } else {
      element = <div></div>;
    }
    return <div className="flow-container">{element}</div>;
  }
}
