require('dotenv').config();

// const ROOT_URL = 'http://localhost:7777';
const ROOT_URL = 'https://api.tweeze.com.br';
const BACKEND = {
  login: `${ROOT_URL}/api/auth/signin`,
  loginToken: `${ROOT_URL}/api/auth/token`,
  loginSocial: `${ROOT_URL}/api/auth/social`,
  cadastro: `${ROOT_URL}/api/auth/signup`,
  password: `${ROOT_URL}/api/auth/password`,
  passwordChange: `${ROOT_URL}/api/auth/password/new`,
  dados: `${ROOT_URL}/api/auth/dados`,
  pagamento: `${ROOT_URL}/api/pagamento`,
  getWords: `${ROOT_URL}/api/words/list`,
  addWord: `${ROOT_URL}/api/words/add`,
  updateWord: `${ROOT_URL}/api/words/update`,
  deleteWord: `${ROOT_URL}/api/words/delete`,
  search: `${ROOT_URL}/api/search`,
  mail: `${ROOT_URL}/api/mail/send`
};
export default BACKEND;
