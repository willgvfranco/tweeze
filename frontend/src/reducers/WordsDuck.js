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

export const getAllWords = () => async (dispatch, getState) => {
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
      type: Types.ERROR,
      data: 'getAllWords'
    });
  }
};

export const createWord = (word) => async (dispatch, getState) => {
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

export const editWord = (word) => async (dispatch, getState) => {
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

export const deleteWord = (wordsId) => async (dispatch, getState) => {
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
  firstFetch: false,
  error: ''
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
    case Types.ERROR:
      return {
        ...state,
        error: action.data
      };
    default:
      return state;
  }
}
