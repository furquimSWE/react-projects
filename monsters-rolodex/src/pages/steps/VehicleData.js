import React, { Component } from "react";

import {
  InputLabel,
  TextField,
  Select,
  MenuItem,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { isEqual } from "lodash";

import "./styles.scss";

import { Title } from "../../components/title/Title";
import { Footer } from "../../components/footer/Footer";
import { NumberFormatCustom } from "../../components/money-input/MoneyInput.js";
import { validations } from "../../helpers/validation";
import { store } from "../../store/index";

const FLOW_KEY = "vehicleData";

const inputProps = {
  style: {
    fontSize: "1.25em",
    fontWeight: 500,
  },
};

const labelProps = {
  style: {
    fontSize: "1.25em",
    fontWeight: 500,
  },
};

const titles = {
  1: {
    title: "Qual o valor do carro que você deseja fazer a simulação?",
    subtitle: "Preencha todos os campos abaixo",
  },
  2: {
    title: "Você já tem uma previsão para a realização desse sonho?",
    subtitle: "Preencha o campo abaixo",
  },
};

export class VehicleData extends Component {
  constructor() {
    super();

    const { flow } = store.getState();

    const step = flow.lastStep ? 2 : 1;

    const { title, subtitle } = this.getStepTitle(step);

    this.state = {
      title,
      subtitle,
      outerStep: flow.currentStep,
      step,
      totalSteps: 2,
      formData: Object.assign({}, flow[FLOW_KEY]),
      valid: false,
      validations: {
        carPrice: true,
        timeSpan: true,
      },
    };
  }

  componentDidMount() {
    if (!isEqual(this.state.formData, {})) this.validateStep();
    this.unsubscribe = store.subscribe(() => {
      this.setState({ outerStep: store.getState().flow.currentStep });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getStepTitle(step) {
    return titles[step];
  }

  // Previne digitação de zeros a esquerda
  formatPriceValue(value) {
    if (value[0] === "0") {
      value = value.split("");
      value.shift();
      value = value.join("");
    }
    return value;
  }

  changeValue(key, { value }) {
    this.setState(
      () => {
        if (key === "carPrice") value = this.formatPriceValue(value);
        return (this.state.formData[key] = value);
      },
      () => {
        this.validateField(key);
      }
    );
  }

  validateField(key) {
    let validation = validations[key];
    let valid = true;

    let value = this.state.formData[key];

    if (validation.pattern) {
      valid &&= validation.pattern.test(value);
    }

    if (validation.custom) {
      valid &&= validation.custom(value);
    }

    this.setState(
      () => {
        let valids = this.state.validations;
        valids[key] = valid;
        return {
          validations: Object.assign({}, valids),
        };
      },
      () => {
        this.validateStep();
      }
    );
  }

  validateStep() {
    let valid = true;
    let keys;

    if (this.state.step === 1) keys = ["carPrice", "installments"];
    else keys = ["timeSpan"];

    for (const key of keys) {
      let validation = validations[key];

      if (validation.pattern) {
        valid &&= validation.pattern.test(this.state.formData[key]);
      }

      if (validation.custom) {
        valid &&= validation.custom(this.state.formData[key]);
      }
    }

    this.setState({ valid }, () => {
      if (this.valid) this.validateFlow();
    });
  }

  render() {
    const { title, subtitle } = this.getStepTitle(this.state.step);
    return (
      <div className="vehicle-data-container">
        <Title title={title} subtitle={subtitle} />
        <div className={`form ${this.state.step === 1 ? "show" : "hide"}`}>
          <div className="input-carprice">
            <InputLabel>Qual o valor total?</InputLabel>
            <div className="input-row">
              <span
                className={`sign ${
                  this.state.validations["carPrice"] !== true
                    ? "border--error"
                    : ""
                }`}
              >
                R$
              </span>
              <div className="input">
                <TextField
                  value={this.state.formData.carPrice}
                  onChange={(e) => this.changeValue("carPrice", e.target)}
                  name="numberformat"
                  id="formatted-numberformat-input"
                  fullWidth
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                    style: { fontSize: 30, color: "#000" },
                  }}
                  InputLabelProps={labelProps}
                  variant="standard"
                  error={this.state.validations["carPrice"] !== true}
                />
              </div>
            </div>
            <div className="error-message">
              <span
                className={`${
                  this.state.validations["carPrice"] ? "hide" : "show"
                }`}
              >
                {validations["carPrice"].message}
              </span>
            </div>
          </div>
          <FormControl variant="standard" className="select-wrapper">
            <InputLabel
              id="installments--label"
              sx={{
                fontSize: "1.25em",
              }}
            >
              Em quantas parcelas?
            </InputLabel>
            <Select
              labelId="installments--label"
              id="demo-simple-select-standard"
              value={this.state.formData.installments}
              inputProps={inputProps}
              onChange={(e) => this.changeValue("installments", e.target)}
              label="Em quantas parcelas?"
              MenuProps={{
                sx: {
                  "& ul": {
                    backgroundColor: "#fff",
                  },
                  "& li": {
                    fontSize: 20,
                    fontWeight: 400,
                    height: 100,
                    borderBottom: "1px solid rgba(126, 126, 126, 0.1)",
                  },
                },
              }}
            >
              {/* to-do pegar lista de verdade da API e ajustar de acordo */}
              {[12, 24, 36, 48].map((installment, index) => {
                return (
                  <MenuItem
                    value={installment}
                    className="installments--option"
                    key={`${installment}x${index}`}
                  >
                    {installment}x
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className={`form ${this.state.step === 1 ? "hide" : "show"}`}>
          <div className="radio-buttons">
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                value={this.state.formData.timeSpan}
                onChange={(e) => this.changeValue("timeSpan", e.target)}
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="Em uma semana"
                />
                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label="Em 15 dias"
                />
                <FormControlLabel
                  value="3"
                  control={<Radio />}
                  label="Em um mês"
                />
                <FormControlLabel
                  value="4"
                  control={<Radio />}
                  label="Estou só simulando"
                />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
        <Footer instance={this} valid={this.state.valid} stepKey={FLOW_KEY} />
      </div>
    );
  }
}
