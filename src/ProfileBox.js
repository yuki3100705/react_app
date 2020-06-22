import React, { Component } from 'react';
import axios from 'axios';
import './ProfileBox.css';

class ProfileBox extends Component {
  constructor(props) {
    super(props);
  }

  deleteUser(id) {
    axios.delete(this.props.url_users + '/' + id).then(this.props.getUser.bind(this));
  }
  updateUser(id, name, address) {
    name = 'Edit';
    address = 'edit@gmail.com';
    const user = { name, address };
    axios.put(this.props.url_users + '/' + id, user).then(this.props.getUser.bind(this));
  }

  render() {
    return (
      <div className="user-list">
        <hr/>
        <p className="list-name"> 名前: {this.props.data.name} </p>
        <p className="list-address"> 連絡先: {this.props.data.address} </p>
        <div>
          <button
            type="button"
            className="Button"
            onClick={() => this.updateUser(this.props.data.id, this.props.data.name, this.props.data.address)}
          >
            編集
          </button>
          <button
            type="button"
            className="Button"
            onClick={() => this.deleteUser(this.props.data.id)}
          >
            削除
          </button>
        </div>
      </div>
    );
  }
}

export default ProfileBox;