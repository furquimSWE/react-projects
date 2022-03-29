import { Component } from "react";
import { FaChevronRight } from "react-icons/fa";

import { Footer } from "../../components/footer/Footer";
import { store } from "../../store/index";
import { Pill } from "../../components/pill/Pill";
import { Title } from "../../components/title/Title";

const FLOW_KEY = "resultData";

export class ResultData extends Component {
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

  onModalClick() {
    console.log("teste");
  }

  onModalClose() {
    console.log("fechando");
  }

  render() {
    return (
      <div className="result-data-container">
        <div className="info">
          {["R$ 20.000,00", "36x"].map((info, index) => {
            return <Pill label={info} key={`pill_${index}`} />;
          })}
        </div>
        <Title title='Resultado da sua simulação' subtitle='Fique a vontade e simule as melhores condições para você' />
        <div className="result-card"></div>
        <Footer
          instance={this}
          valid={this.state.valid}
          step={this.state.step}
          stepKey={FLOW_KEY}
          legalTerms={
            <div>
              Sujeito à análise e aprovação de crédito pelo banco Itaú, que
              poderá entrar em contato por telefone, SMS ou e-mail, para
              confirmação de dados ou obtenção de informações adicionais, bem
              como tratar da proposta. Saiba mais como o banco parceiro do
              iCarros trata seus dados na Política de Privacidade disponível em
              seus sites e aplicativos.
              <br />
              Para saber como o iCarros trata seus dados acesse nosso{" "}
              <a href="#">Termos de uso e Políticas de privacidade.</a>
            </div>
          }
        />
      </div>
    );
  }
}
