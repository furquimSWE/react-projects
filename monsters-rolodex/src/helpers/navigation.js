export const advance = (instance) => {
  if (!instance.state.valid) return;
  if (instance.state.step + 1 <= instance.state.totalSteps) {
    // to-do validate current inner step

    // if valid advances inner step
    instance.setState(
      () => {
        return {
          step: instance.state.step + 1,
          valid: false,
        };
      },
      () => {
        instance.validateStep();
      }
    );

    // else show erros to the user and prevent from advancing
  } else {
    // to-do validate current outer step

    // if valid saves formData inside the central store and advances
    instance.saveFlowStepData();
    instance.nextFlowStep();

    // else show errors to the user and prevent from advancing
  }
};

export const back = (instance) => {
  if (instance.state.step - 1 >= 1) {
    instance.setState(
      () => {
        return {
          step: instance.state.step - 1,
        };
      },
      () => {
        instance.validateStep();
      }
    );
  } else {
    instance.saveFlowStepData();
    instance.previousFlowStep();
  }
};
