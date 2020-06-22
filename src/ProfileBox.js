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
      <div className="col-xs-12 col-md-4">
        <div className="list-user">
          <h3 className="list-name"> 名前: {this.props.data.name} </h3>
          <p> 連絡先: {this.props.data.address} </p>
          <div>
            <button
              type="button"
              className="MyButton"
              onClick={() => this.updateUser(this.props.data.id, this.props.data.name, this.props.data.address)}
            >
              編集
            </button>
            <button
              type="button"
              className="MyButton"
              onClick={() => this.deleteUser(this.props.data.id)}
            >
              削除
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileBox;