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
      data: handleWords(handleWords(result.data.grupo_palavras))
    });
  } catch (error) {
    console.log('createWord error', error);
    dispatch({
      type: Types.ERROR,
      data: 'createWord'
    });
  }
};

export const editWord = () => {
  // edit word logic
  // BACKEND.updateWord

  return {
    type: Types.EDIT
  };
};

export const deleteWord = () => {
  // delete word logic
  // BACKEND.deleteWord

  return {
    type: Types.DELETE
  };
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
        ...state
      };
    case Types.EDIT:
      return {
        ...state
      };
    case Types.DELETE:
      return {
        ...state
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
