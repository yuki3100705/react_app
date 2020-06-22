import axios from 'axios';

const url_users = 'http://localhost:3001/users';

export default function DeleteUser(props) {
  axios.delete(url_users + '/' + props.id);
}