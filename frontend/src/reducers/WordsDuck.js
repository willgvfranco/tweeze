import axios from 'axios';

import BACKEND from '../config/env';

export const Types = {
  GET: 'word/GET',
  CREATE: 'word/CREATE',
  EDIT: 'word/EDIT',
  DELETE: 'word/DELETE',
  STATUS: 'word/STATUS',
  CLEAR_STATUS: 'word/CLEAR_STATUS'
};

const handleWords = (words) => {
  const newWords = {};
  for (const key in Object(words)) {
    newWords[words[key]._id] = words[key];
  }

  return newWords;
};

export const clearStatus = () => (dispatch) => {
  dispatch({
    type: Types.CLEAR_STATUS
  });
};

export const getAllWords = () => async (dispatch, getState) => {
  clearStatus()(dispatch);
  const { accessToken, id } = getState().auth;
  const { firstFetch } = getState().words;

  if (!id) return;

  try {
    const result = await axios({
      method: 'post',
      url: BACKEND.getWords,
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      },
      data: {
        userId: id
      }
    });

    firstFetch
      ? dispatch({
          type: Types.GET,
          data: {
            words: handleWords(result.data.grupo_palavras)
          }
        })
      : dispatch({
          type: Types.GET,
          data: {
            words: handleWords(result.data.grupo_palavras),
            firstFetch: true
          }
        });
  } catch (error) {
    console.log('getAllWords error', error);
    dispatch({
      type: Types.STATUS,
      data: {
        type: 'error',
        description: 'getAllWords',
        msg: 'Ocorreu um erro ao buscar os grupos!'
      }
    });
  }
};

export const createWord = (word) => async (dispatch, getState) => {
  clearStatus()(dispatch);
  const { accessToken, id } = getState().auth;

  try {
    const result = await axios({
      method: 'post',
      url: BACKEND.addWord,
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      },
      data: {
        userId: id,
        ...word
      }
    });

    dispatch({
      type: Types.STATUS,
      data: {
        type: 'success',
        description: 'createWord',
        msg: 'Grupo criado com sucesso!'
      }
    });
    dispatch({
      type: Types.CREATE,
      data: handleWords(result.data.grupo_palavras)
    });
  } catch (error) {
    console.log('createWord error', error);
    dispatch({
      type: Types.STATUS,
      data: {
        type: 'error',
        description: 'createWord',
        msg: 'Ocorreu um erro ao criar o grupo!'
      }
    });
  }
};

export const editWord = (word) => async (dispatch, getState) => {
  clearStatus()(dispatch);
  const { accessToken, id } = getState().auth;
  const { _id: wordsId, name, pos, neg } = word;

  try {
    const result = await axios({
      method: 'post',
      url: BACKEND.updateWord,
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      },
      data: {
        userId: id,
        wordsId,
        name,
        pos,
        neg
      }
    });

    dispatch({
      type: Types.STATUS,
      data: {
        type: 'success',
        description: 'editWord',
        msg: 'Grupo editado com sucesso!'
      }
    });
    dispatch({
      type: Types.EDIT,
      data: handleWords(result.data.grupo_palavras)
    });
  } catch (error) {
    console.log('editWord error', error);
    dispatch({
      type: Types.STATUS,
      data: {
        type: 'error',
        description: 'editWord',
        msg: 'Ocorreu um erro ao editar o grupo!'
      }
    });
  }
};

export const deleteWord = (wordsId) => async (dispatch, getState) => {
  clearStatus()(dispatch);
  const { accessToken, id } = getState().auth;

  try {
    const result = await axios({
      method: 'post',
      url: BACKEND.deleteWord,
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      },
      data: {
        userId: id,
        wordsId
      }
    });

    dispatch({
      type: Types.STATUS,
      data: {
        type: 'success',
        description: 'deleteWord',
        msg: 'Grupo deletado!'
      }
    });
    dispatch({
      type: Types.DELETE,
      data: handleWords(result.data.grupo_palavras)
    });
  } catch (error) {
    console.log('deleteWord error', error);
    dispatch({
      type: Types.STATUS,
      data: {
        type: 'error',
        description: 'deleteWord',
        msg: 'Ocorreu um erro ao deletar o grupo!'
      }
    });
  }
};

const initialState = {
  words: {},
  firstFetch: false,
  status: {
    type: '',
    description: '',
    msg: ''
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.GET:
      return {
        ...state,
        words: action.data.words,
        firstFetch: action.data?.firstFetch
      };
    case Types.CREATE:
      return {
        ...state,
        words: action.data
      };
    case Types.EDIT:
      return {
        ...state,
        words: action.data
      };
    case Types.DELETE:
      return {
        ...state,
        words: action.data
      };
    case Types.STATUS:
      return {
        ...state,
        status: { ...action.data }
      };
    case Types.CLEAR_STATUS:
      return {
        ...state,
        status: {
          type: '',
          description: '',
          msg: ''
        }
      };
    default:
      return state;
  }
}
