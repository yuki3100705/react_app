import React, { Component } from 'react';
import axios from 'axios';
import './Content.css';
import ProfileBox from './ProfileBox';

class Content extends Component {
  constructor() {
    super();
    this.state = {
      url_users: 'http://localhost:3001/users',
      data: [],
      regname: '',
      regaddress: '',
    };
  }
  componentDidMount() {
    this.getUser();
  }
  getUser() {
    axios
      .get(this.state.url_users)
      .then((results) => {
        console.log(results.data);
        this.setState({
          data: results.data,
        });
      },)
      .catch((error) => {
        if (error.response) {
          // このリクエストはステータスコードとともに作成されます
          // 2xx系以外の時にエラーが発生します
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // このリクエストはレスポンスが返ってこない時に作成されます。
          // `error.request`はXMLHttpRequestのインスタンスです。
          console.log(error.request);
        } else {
          //それ以外で何か以上が起こった時
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  }
  registerUser(regname, regaddress) {
    const user = { name : regname, address : regaddress };
    axios.post(this.state.url_users, user).then(this.getUser.bind(this));
    this.setState({regname: '', regaddress: ''});
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
        <h1 className="MyContent-title">We Are Symitems!</h1>
        <div>名前：<input value={this.state.regname} onChange={this.changeRegName.bind(this)} style={{display: 'inline-block', _display: 'inline'}} /></div>
        <div>連絡先：<input value={this.state.regaddress} onChange={this.changeRegAddress.bind(this)} style={{display: 'inline-block', _display: 'inline'}} /></div>
        <div className="AddButton">
          <button
            type="button"
            className="MyButton"
            onClick={() => this.registerUser(this.state.regname, this.state.regaddress)}
          >
            登録
          </button>
        </div>
        <div className="grid">
          <div className="row">
            {this.state.data.map((value) => {
              return <ProfileBox data={value} url_users={this.state.url_users} getUser={this.getUser.bind(this)} />;
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Content;