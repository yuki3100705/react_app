import axios from 'axios';

const url_users = 'http://localhost:3001/users';

export default function EditUser(props) {
  const name = props.name;
  const address = props.address;
  const user = { name, address };
  axios.put(url_users + '/' + props.id, user);
}