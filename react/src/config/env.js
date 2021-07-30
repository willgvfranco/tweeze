require('dotenv').config();

// const ROOT_URL = 'http://localhost:7777';
const ROOT_URL = 'http://165.227.72.240:7777';
const BACKEND = {
  login: `${ROOT_URL}/api/auth/signin`,
  cadastro: `${ROOT_URL}/api/auth/signup`
};
export default BACKEND;
