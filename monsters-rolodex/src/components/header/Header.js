import { Component } from "react";
import './styles.scss'
import logo from '../../assets/header/itau.svg'

import { FaChevronLeft } from "react-icons/fa";

export class Header extends Component {
  constructor() {
    super();

    this.state = {
      text: 'Simulação de financiamento',
    }
  }

  render() {
    return (
      <div className="header--container">
        <span className="header--icon">
          <FaChevronLeft />
        </span>
        <span className="header--text">
          { this.state.text }
        </span>
        <span className="header--logo">
          <img src={logo} alt="Logo do Banco Itaú"></img>
        </span>
      </div>
    )
  }
}