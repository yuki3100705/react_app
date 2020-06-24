import React, { Component } from 'react';
import axios from 'axios';
import './Login.css';
import { Link } from "react-router-dom";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      regname: '',
      regaddress: '',
    };
  }

  changeRegName(e) {
    this.setState({regname: e.target.value});
  }
  changeRegAddress(e) {
    this.setState({regaddress: e.target.value});
  }

  render() {
    return (
      <div className="MyContent">
        <h1 className="MyContent-title">Login</h1>
        <div>Name：<input value={this.state.regname} onChange={this.changeRegName.bind(this)} style={{display: 'inline-block', _display: 'inline'}} /></div>
        <div>Address：<input value={this.state.regaddress} onChange={this.changeRegAddress.bind(this)} style={{display: 'inline-block', _display: 'inline'}} /></div>
        <Link to="/administrator" className="MyButton">Login</Link>
      </div>
    );
  }
}

export default Login;