import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      imgs: []
    };
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          hello
        </header>
      </div>
    );
  }
  componentDidMount() {
  }
}

export default App;
