require('dotenv').config();

// const ROOT_URL = 'http://localhost:7777';
const ROOT_URL = 'https://api.tweeze.com.br';
const BACKEND = {
  login: `${ROOT_URL}/api/auth/signin`,
  loginToken: `${ROOT_URL}/api/auth/token`,
  cadastro: `${ROOT_URL}/api/auth/signup`,
  getWords: `${ROOT_URL}/api/words/list`,
  addWord: `${ROOT_URL}/api/words/add`,
  updateWord: `${ROOT_URL}/api/words/update`,
  deleteWord: `${ROOT_URL}/api/words/delete`,
  search: `${ROOT_URL}/api/search`
};
export default BACKEND;