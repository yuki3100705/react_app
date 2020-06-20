import React, { Component } from 'react';
import axios from 'axios';
import './Content.css';

const url_users = 'http://localhost:3001/users';

class Content extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      regname: '',
      regaddress: ''
    };
  }
  componentDidMount() {
    this.getUser();
  }
  getUser() {
    axios
      .get(url_users)
      .then((results) => {
        this.setState({
          data: results.data
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
    axios.post(url_users, user).then(this.getUser.bind(this));
    this.setState({regname: '', regaddress: ''});
  }
  changeRegName(e) {
    this.setState({regname: e.target.value});
  }
  changeRegAddress(e) {
    this.setState({regaddress: e.target.value});
  }
  deleteUser(id) {
    axios.delete(url_users + '/' + id).then(this.getUser.bind(this));
  }
  updateUser(id, name, address) {
    name = 'Edit';
    address = 'edit@gmail.com';
    const user = { name, address };
    axios.put(url_users + '/' + id, user).then(this.getUser.bind(this));
  }

  render() {
    return (
      <div className="Content-header">
        <h1 className="Content-title">We Are Symitems!</h1>
        <div>名前：<input value={this.state.regname} onChange={this.changeRegName.bind(this)} style={{display: 'inline-block', _display: 'inline'}} /></div>
        <div>連絡先：<input value={this.state.regaddress} onChange={this.changeRegAddress.bind(this)} style={{display: 'inline-block', _display: 'inline'}} /></div>
        <div>
          <button
          type="button"
          className="Button"
          onClick={() => this.registerUser(this.state.regname, this.state.regaddress)}
          >
            登録
          </button>
        </div>
        {this.state.data.map((v)=>{
          return (
            <div className="user-list">
              <hr/>
              <p className="list-name"> 名前: {v.name} </p>
              <p className="list-address"> 連絡先: {v.address} </p>
              <button
                type="button"
                className="Button"
                onClick={() => this.updateUser(v.id, v.name, v.address)}
              >
                編集
              </button>
              <button
                type="button"
                className="Button"
                onClick={() => this.deleteUser(v.id)}
              >
                削除
              </button>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Content;