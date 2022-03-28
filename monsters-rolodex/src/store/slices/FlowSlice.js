import { createSlice } from "@reduxjs/toolkit";

import { FaCalculator, FaCar, FaRegUser } from "react-icons/fa";

export const flow = createSlice({
  name: "flow",
  initialState: {
    currentStep: 3,
    totalSteps: 3,
    personalData: {},
    vehicleData: {
      carPrice: '',
      installments: '',
      timeSpan: ''
    },
    resultData: {},
    steps: [
      {
        icon: <FaRegUser />,
        label: "Dados pessoais",
      },
      {
        icon: <FaCar />,
        label: "Sobre o carro",
      },
      {
        icon: <FaCalculator />,
        label: "Análise de crédito",
      },
    ],
  },
  reducers: {
    advance: (state) => {
      if (state.currentStep + 1 <= state.totalSteps) {
        return {
          ...state,
          currentStep: state.currentStep + 1,
        };
      } else {
        // to-do return error
      }
    },
    back: (state) => {
      if (state.currentStep - 1 >= 1) {
        return {
          ...state,
          currentStep: state.currentStep - 1,
        };
      } else {
        // to-do return error
      }
    },
    updateFormData: (state, { payload }) => {
      let { key, formData } = payload;

      const newState = {
        ...state,
      };
      newState[key] = formData;

      console.log(newState);
      return newState;
    },
  },
});
