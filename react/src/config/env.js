require('dotenv').config();

// const ROOT_URL = 'http://localhost:7777';
const ROOT_URL = 'http://165.227.72.240:7777';
const BACKEND = {
  login: `${ROOT_URL}/api/auth/signin`,
  cadastro: `${ROOT_URL}/api/auth/signup`,
  getWords: `${ROOT_URL}/api/words/list`,
  addWord: `${ROOT_URL}/api/words/add`,
  updateWord: `${ROOT_URL}/api/words/update`,
  deleteWord: `${ROOT_URL}/api/words/delete`,
  search: `${ROOT_URL}/api/search`
};
export default BACKEND;
