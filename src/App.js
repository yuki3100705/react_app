import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Login from './Login';
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
          <Route exact path='/' component={Login} />
          <Route path="/administrator" component={Administrator} />
          <Route path="/calendar" component={Calendar} />
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
