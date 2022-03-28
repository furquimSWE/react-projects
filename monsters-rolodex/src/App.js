import { Component } from 'react';

import './App.scss';
import { Header } from './components/header/Header';
import { FlowHeader } from './components/flow-header/FlowHeader';
import { FlowContainer } from './components/flow-container/FlowContainer';


class App extends Component { 
  render() {
    return (
      <div className="App">
        <div className="Container">
          <Header />
          <FlowHeader />
          <FlowContainer />
        </div>
      </div>
    );
  }
}

export default App;
