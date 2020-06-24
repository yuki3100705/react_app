import axios from 'axios';

const url_users = 'http://localhost:3001/users';

export default function AddUser(props) {
  const user = { name : props.regname, address : props.regaddress };
  axios.post(url_users, user);
}