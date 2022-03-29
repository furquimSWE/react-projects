import { store } from "../store";

export const advance = (instance, key) => {
  let { state } = instance;
  if (!state.valid) return;
  if (state.step + 1 <= state.totalSteps) {
    // to-do validate current inner step
    // if valid advances inner step
    instance.setState(
      () => {
        return {
          step: state.step + 1,
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

    // if valid saves formData inside the central data store and advances
    updateFormData(state, key);
    nextFlowStep();

    // else show errors to the user and prevent from advancing
  }
};

//
export const back = (instance, key) => {
  let { state } = instance;

  if (state.step - 1 >= 1) {
    instance.setState(
      () => {
        return {
          step: state.step - 1,
        };
      },
      () => {
        instance.validateStep();
      }
    );
  } else {
    updateFormData(state, key);
    previousFlowStep();
  }
};

// Trocam o componente dentro do flow container (avança ou retorna)
const nextFlowStep = () => store.dispatch({ type: "flow/advance" });
const previousFlowStep = () => store.dispatch({ type: "flow/back" });

// Atualiza o formData na data store central
const updateFormData = ({ formData }, key) => {
  console.log("atualizando formData", formData, key);
  const payload = {
    key,
    formData,
  };
  store.dispatch({
    type: "flow/updateFormData",
    payload,
  });
};
