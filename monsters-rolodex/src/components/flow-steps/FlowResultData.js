import { Component } from "react";
import { FaChevronRight } from "react-icons/fa";
import { Modal } from "@mui/material";

import { FooterActions } from "../footer-actions/FooterActions";
import { store } from "../../store/index";
import { Pill } from "../pill/Pill";
import ErrorModal from "../modal/Modal";

export class FlowResultData extends Component {
  constructor() {
    super();

    let { flow } = store.getState();

    this.state = {
      outerStep: flow.currentStep,
      modal: {
        open: true,
      },
    };
  }

  handleClose() {
    this.setState(() => {
      let modal = Object.assign({}, this.state.modal);
      modal.open = false;
      return { modal };
    });
  }
  render() {
    return (
      <div className="flow-rd--container">
        <div className="flow--modal-container">
          <ErrorModal />
        </div>
        <div className="flow--info">
          {["R$ 20.000,00", "36x"].map((info) => {
            return <Pill label={info} />;
          })}
        </div>

        <div className="flow--title">Resultado da sua simulação</div>
        <div className="flow--subtitle">
          Fique a vontade e simule as melhores condições para você
        </div>
        <div className="flow--result-card"></div>
        <div className="flow--footer">
          <div className="flow--footer-button">
            <span>Custo efetivo total (CET)</span> <FaChevronRight />
          </div>
          <div className="flow--footer-button last">
            <span>Centrais de atendimento</span> <FaChevronRight />
          </div>
          <div className="flow--footer-legal">
            <span>
              Sujeito à análise e aprovação de crédito pelo banco Itaú, que
              poderá entrar em contato por telefone, SMS ou e-mail, para
              confirmação de dados ou obtenção de informações adicionais, bem
              como tratar da proposta. Saiba mais como o banco parceiro do
              iCarros trata seus dados na Política de Privacidade disponível em
              seus sites e aplicativos. Para saber como o iCarros trata seus
              dados acesse nosso{" "}
              <a href="#">Termos de uso e Políticas de privacidade.</a>
            </span>
          </div>
        </div>
        <div className="flow--divider">
          <span className="divider"></span>
        </div>
        <FooterActions
          advance={this.advance}
          back={this.back}
          valid={this.state.valid}
          instance={this}
        />
      </div>
    );
  }
}
