import axios from 'axios';

const url_users = 'http://localhost:3001/users';

export default function GetUser() {
  axios
    .get(url_users)
    .then((results) => {
      return results.data
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