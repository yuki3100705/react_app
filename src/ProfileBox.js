import React, { Component } from 'react';
import axios from 'axios';
import './ProfileBox.css';
import Modal from 'react-modal';
import CloseButton from './Close.png';

class ProfileBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      editname: this.props.data.name,
      editaddress: this.props.data.address,
    }
  }

  deleteUser(id) {
    axios.delete(this.props.url_users + '/' + id).then(this.props.getUser.bind(this));
  }
  updateUser(id, name, address) {
    const user = { name, address };
    axios.put(this.props.url_users + '/' + id, user).then(this.props.getUser.bind(this)).then(this.closeModal());
  }
  changeEditName(e) {
    this.setState({editname: e.target.value});
  }
  changeEditAddress(e) {
    this.setState({editaddress: e.target.value});
  }

  openModal() {
    this.setState({
      modalIsOpen: true,
    });
    document.body.setAttribute('style', 'overflow: hidden;');
  }
  closeModal() {
    this.setState({ modalIsOpen: false });
    document.body.removeAttribute('style', 'overflow: hidden;');
  }

  render() {
    return (
      <div className="col-xs-12 col-sm-6 col-lg-4 col-xl-3">
        <div className="list-user">
          <h3 className="list-name"> 名前: {this.props.data.name} </h3>
          <p> 連絡先: {this.props.data.address} </p>
          <div>
            <button
              type="button"
              className="MyButton"
              onClick={this.openModal.bind(this)}
            >
              編集
            </button>
            <Modal
              isOpen={this.state.modalIsOpen}
              onRequestClose={this.closeModal.bind(this)}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <div className="Modal-Header">
                <div style={{display: 'inline-block', _display: 'inline'}}>ユーザ編集モーダル</div>
                <img src={CloseButton} className="close" onClick={this.closeModal.bind(this)} alt="" />
              </div>
              <hr />
              <div className="Modal-Content" style={{ border: 'solid 1px #eee' }}>
                <div>名前：<input value={this.state.editname} onChange={this.changeEditName.bind(this)} style={{display: 'inline-block', _display: 'inline'}} /></div>
                <div>連絡先：<input value={this.state.editaddress} onChange={this.changeEditAddress.bind(this)} style={{display: 'inline-block', _display: 'inline'}} /></div>
                <button className="MyButton" onClick={() => this.updateUser(this.props.data.id, this.state.editname, this.state.editaddress)}>編集</button>
              </div>
            </Modal>
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

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
  },
  content: {
    position: 'absolute',
    top: '80px',
    left: '80px',
    right: '80px',
    bottom: '80px',
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px',
  },
}

export default ProfileBox;