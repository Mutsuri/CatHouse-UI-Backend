import server from '../constant/ApiConfig';

const postLogin = (data) => {
  return server.post('auth/login', data);
};

export default {
  postLogin,
};
