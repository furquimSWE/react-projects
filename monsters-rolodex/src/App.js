import { Component } from "react";

import "./App.scss";
import { Header } from "./components/header/Header";
import { Container } from "./components/container/Container";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="Container">
          <Header />
          <Container />
        </div>
      </div>
    );
  }
}

export default App;
