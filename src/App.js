import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Content from './Content';
import Administrator from './Administrator';
import Calendar from './Calendar';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="MyApp">
        <Header />
        <Router>
          <Route path="" component={Content}></Route>
          <Route path="/administrator" component={Administrator}></Route>
          <Route path="/calendar" component={Calendar}></Route>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
