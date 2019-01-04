import React, { Component } from 'react';
import MapContainer from './components/map';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
          <MapContainer />
      </div>
    );
  }
}

export default App;
