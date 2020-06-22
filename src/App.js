import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <div className="MyApp">
        <Header />
        <Content />
        <Footer />
      </div>
    );
  }
}

export default App;
