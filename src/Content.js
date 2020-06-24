import React, { Component } from 'react';
import axios from 'axios';
import './Content.css';

const login_url = 'http://localhost:3001/login';
const url_users = 'http://localhost:3001/users';

function validateRequired (property, message){
  const error = property === "" || property === null ? [message] : null;
  return error;
}

class Content extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      loginname: '',
      loginaddress: '',
      comment: '',
      errors: '',
      nameError: '',
      addressError: '',
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
          // このリクエストはレスポンスが返ってこない時に作成されます
          // `error.request`はXMLHttpRequestのインスタンスです
          console.log(error.request);
        } else {
          //それ以外で何か異常が起こった時
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  }

  auth(loginname, loginaddress) {
    this.setState({
      errors: { nameError: "", addressError: "", _global: [] },
      comment: ""
    });
    const loginnameError = validateRequired(loginname, "ユーザ名を入力してください");
    const loginaddressError = validateRequired(loginaddress, "電話番号を入力してください");
    if (loginnameError || loginaddressError) {
      this.setState({
        errors: { nameError: loginnameError, addressError: loginaddressError, _global: [] },
        processing: false
      });
      return;
    }
    const user = { name : loginname, address : loginaddress };
    axios.post(login_url + '/auth', user).then((results) => {this.setState({comment: results.data.comment})},).then(this.getUser.bind(this));
  }
  testdelete(id) {
    axios.post(login_url + '/desdes/' + id).then(this.getUser.bind(this));
  }

  loginUser(loginname, loginaddress) {
    const user = { name : loginname, address : loginaddress };
    axios.post(url_users, user).then(this.getUser.bind(this));
    this.setState({loginname: '', loginaddress: ''});
  }
  changeLoginName(e) {
    this.setState({loginname: e.target.value});
  }
  changeLoginAddress(e) {
    this.setState({loginaddress: e.target.value});
  }

  deleteUser(id) {
    axios.delete(url_users + '/' + id).then(this.getUser.bind(this));
  }

  render() {
    return (
      <div className="Content-header">
        <div>{this.state.comment}</div>
        <div>{this.state.errors.nameError}</div>
        <div>{this.state.errors.addressError}</div>
        {this.state.data.map((v)=>{
          return (
            <div className="user-list">
              <hr/>
              <p className="list-name"> 名前: {v.name} </p>
              <p className="list-address"> 連絡先: {v.address} </p>

              <button
                type="button"
                className="Button"
                onClick={() => this.testdelete(v.id)}
              >
                testdelete
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
        <h1 className="Content-title">We Are Symitems!</h1>
        <div>name：<input value={this.state.loginname} onChange={this.changeLoginName.bind(this)} style={{display: 'inline-block', _display: 'inline'}} /></div>
        <div>address：<input value={this.state.loginaddress} onChange={this.changeLoginAddress.bind(this)} style={{display: 'inline-block', _display: 'inline'}} /></div>
        <div>
        <button
        type="button"
        className="MyButton"
        onClick={() => this.auth(this.state.loginname, this.state.loginaddress)}
        >
          login
        </button>

          <button
          type="button"
          className="MyButton"
          onClick={() => this.loginUser(this.state.loginname, this.state.loginaddress)}
          >
            登録
          </button>

        </div>
      </div>
    );
  }
}

export default Content;