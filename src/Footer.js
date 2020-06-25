import React, { Component } from 'react';
import './Footer.css';
import Icon from './symitems.png';

class Footer extends Component {

  render() {
    return (
      <div className="footer">
        <img src={Icon} className="footer-logo" alt="" />
      </div>
    );
  }
}

export default Footer;
