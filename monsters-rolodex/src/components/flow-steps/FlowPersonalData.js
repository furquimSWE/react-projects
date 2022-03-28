import { Component } from "react";
import { TextField } from "@mui/material";
import InputMask from "react-input-mask";
import { isEqual } from "lodash";

import "./styles.scss";
import { Button } from "../button/Button";

import { validations } from "../../helpers/validation";

import { store } from "../../store/index";
import { FooterActions } from "../footer-actions/FooterActions";

const FLOW_KEY = "personalData";

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

export class FlowPersonalData extends Component {
  constructor() {
    super();

    let { flow } = store.getState();

    this.state = {
      outerStep: flow.currentStep,
      step: 1,
      totalSteps: 2,
      formData: Object.assign({}, flow[FLOW_KEY]),
      valid: false,
      validations: {
        fullName: true,
        cpf: true,
        birthDate: true,
        phone: true,
        email: true,
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

  changeValue(key, { value }) {
    this.setState(
      () => {
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

    if (this.state.step === 1) {
      keys = ["fullName", "cpf"];
    } else {
      keys = ["email", "birthDate", "phone"];
    }

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

  validateFlow() {
    // validar outer step
  }

  saveFlowStepData() {
    store.dispatch({
      type: "flow/updateFormData",
      payload: {
        key: FLOW_KEY,
        formData: this.state.formData,
      },
    });
  }

  nextFlowStep() {
    store.dispatch({ type: "flow/advance" });
  }

  previousFlowStep() {
    store.dispatch({ type: "flow/back" });
  }

  render() {
    return (
      <div className="flow-pd--container">
        <div className="flow--title">Conte-nos um pouco sobre você</div>
        <div className="flow--subtitle">Preencha todos os campos abaixo</div>
        <div
          className={`flow--form-step ${this.state.step !== 1 ? "hide" : ""}`}
        >
          <div className="flow-form--input">
            <TextField
              id="standard-basic"
              label="Qual seu nome completo?"
              variant="standard"
              fullWidth
              InputProps={inputProps}
              InputLabelProps={labelProps}
              value={this.state.formData.fullName}
              onChange={(e) => this.changeValue("fullName", e.target)}
              error={this.state.validations["fullName"] !== true}
            />
            <div className="flow-form--error-message">
              <span
                className={`${
                  this.state.validations["fullName"] ? "hide" : "show"
                }`}
              >
                {validations["fullName"].message}
              </span>
            </div>
          </div>

          <div className="flow-form--input">
            <InputMask
              mask="999.999.999-99"
              maskChar=""
              placeholder="000.000.000-00"
              InputProps={inputProps}
              InputLabelProps={labelProps}
              value={this.state.formData.cpf}
              onChange={(e) => this.changeValue("cpf", e.target)}
              error={this.state.validations["cpf"] !== true}
            >
              {(inputProps) => (
                <TextField
                  {...inputProps}
                  id="standard-basic"
                  label="Qual seu CPF?"
                  variant="standard"
                  fullWidth
                />
              )}
            </InputMask>
            <div className="flow-form--error-message">
              <span
                className={`${this.state.validations["cpf"] ? "hide" : "show"}`}
              >
                {validations["cpf"].message}
              </span>
            </div>
          </div>
        </div>
        <div
          className={`flow--form-step ${this.state.step !== 2 ? "hide" : ""}`}
        >
          <div className="flow-form--input">
            <TextField
              id="standard-basic"
              label="Qual seu e-mail?"
              variant="standard"
              fullWidth
              InputProps={inputProps}
              InputLabelProps={labelProps}
              value={this.state.formData.email}
              onChange={(e) => this.changeValue("email", e.target)}
              error={this.state.validations["email"] !== true}
            />
            <div className="flow-form--error-message">
              <span
                className={`${
                  this.state.validations["email"] ? "hide" : "show"
                }`}
              >
                {validations["email"].message}
              </span>
            </div>
          </div>
          <div className="flow-form--input">
            <InputMask
              mask="99/99/9999"
              maskChar=""
              placeholder="00/00/0000"
              InputProps={inputProps}
              InputLabelProps={labelProps}
              value={this.state.formData.birthDate}
              onChange={(e) => this.changeValue("birthDate", e.target)}
              error={this.state.validations["birthDate"] !== true}
            >
              {(inputProps) => (
                <TextField
                  {...inputProps}
                  id="standard-basic"
                  label="Qual sua data de nascimento?"
                  variant="standard"
                  fullWidth
                />
              )}
            </InputMask>
            <div className="flow-form--error-message">
              <span
                className={`${
                  this.state.validations["birthDate"] ? "hide" : "show"
                }`}
              >
                {validations["birthDate"].message}
              </span>
            </div>
          </div>
          <div className="flow-form--input">
            <InputMask
              mask="(99) 99999-9999"
              maskChar=""
              placeholder="(00) 00000-0000"
              InputProps={inputProps}
              InputLabelProps={labelProps}
              value={this.state.formData.phone}
              onChange={(e) => this.changeValue("phone", e.target)}
              error={this.state.validations["phone"] !== true}
            >
              {(inputProps) => (
                <TextField
                  {...inputProps}
                  id="standard-basic"
                  label="Qual seu telefone principal?"
                  variant="standard"
                  fullWidth
                />
              )}
            </InputMask>
            <div className="flow-form--error-message">
              <span
                className={`${
                  this.state.validations["phone"] ? "hide" : "show"
                }`}
              >
                {validations["phone"].message}
              </span>
            </div>
          </div>
        </div>
        <div className="flow--legal-terms">
          Ao clicar no botão abaixo você autoriza a coleta e envio dos dados
          para os bancos parceiros, conforme nossos{" "}
          <a href="www.icarros.com.br">
            Termos de uso e Políticas de privacidade.
          </a>
        </div>
        <div className="divider--container-personal">
          <span className="divider"></span>
        </div>
        <FooterActions
          instance={this}
          valid={this.state.valid}
          step={this.state.step}
        />
      </div>
    );
  }
}
