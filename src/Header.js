import React, { Component } from 'react';
import './Header.css';
import Icon from './symitems.png';

class Header extends Component {

  render() {
    return (
      <div className="header">
        <img src={Icon} className="header-logo" alt="" />
        <div className="header-title">
          Symitems Application Prototype
        </div>
      </div>
    );
  }
}

export default Header;
