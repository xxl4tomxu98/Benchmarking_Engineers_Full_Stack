import React, { Component } from 'react';
import './App.css';
import Percentiles from './components/Percentiles';

class App extends Component {
  render() {
    const { candidates } = this.props;
    return (
      <div className="App">
          <Percentiles candidates={candidates}/>
      </div>
    );
  }
}

export default App;
