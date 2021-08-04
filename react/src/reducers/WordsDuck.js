import axios from 'axios';

import BACKEND from '../config/env';

export const Types = {
  GET: 'word/GET',
  CREATE: 'word/CREATE',
  EDIT: 'word/EDIT',
  DELETE: 'word/DELETE',
  ERROR: 'word/ERROR'
};

const handleWords = (words) => {
  const newWords = {};
  for (const key in Object(words)) {
    newWords[words[key]._id] = words[key];
  }

  return newWords;
};

export const getAllWords = () => async (dispatch) => {
  try {
    const result = await axios({
      method: 'post',
      url: BACKEND.getWords,
      data: {
        userId: '6103516ba2043a52609dfcf3'
      }
    });

    dispatch({
      type: Types.GET,
      data: handleWords(result.data.grupo_palavras)
    });
  } catch (error) {
    console.log('getAllWords error', error);
    dispatch({
      type: Types.ERROR,
      data: 'getAllWords'
    });
  }
};

export const createWord = (word) => async (dispatch) => {
  try {
    const result = await axios({
      method: 'post',
      url: BACKEND.addWord,
      data: {
        userId: '6103516ba2043a52609dfcf3',
        ...word
      }
    });

    dispatch({
      type: Types.CREATE,
      data: handleWords(result.data.grupo_palavras)
    });
  } catch (error) {
    console.log('createWord error', error);
    dispatch({
      type: Types.ERROR,
      data: 'createWord'
    });
  }
};

export const editWord = (word) => async (dispatch) => {
  // const { id: userId } = getState().auth;
  // Implementar: auth
  const { _id: wordsId, name, pos, neg } = word;

  try {
    const result = await axios({
      method: 'post',
      url: BACKEND.updateWord,
      data: {
        userId: '6103516ba2043a52609dfcf3',
        wordsId,
        name,
        pos,
        neg
      }
    });

    dispatch({
      type: Types.EDIT,
      data: handleWords(result.data.grupo_palavras)
    });
  } catch (error) {
    console.log('editWord error', error);
    dispatch({
      type: Types.ERROR,
      data: 'editWord'
    });
  }
};

export const deleteWord = (wordsId) => async (dispatch) => {
  try {
    const result = await axios({
      method: 'post',
      url: BACKEND.deleteWord,
      data: {
        userId: '6103516ba2043a52609dfcf3',
        wordsId
      }
    });

    dispatch({
      type: Types.DELETE,
      data: handleWords(result.data.grupo_palavras)
    });
  } catch (error) {
    console.log('deleteWord error', error);
    dispatch({
      type: Types.ERROR,
      data: 'deleteWord'
    });
  }
};

const initialState = {
  words: {},
  error: ''
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.GET:
      return {
        ...state,
        words: action.data
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
    case Types.ERROR:
      return {
        ...state,
        error: action.data
      };
    default:
      return state;
  }
}
