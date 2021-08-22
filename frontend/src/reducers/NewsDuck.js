import axios from 'axios';

import BACKEND from '../config/env';

export const Types = {
  GET: 'news/GET',
  ERROR: 'news/ERROR'
};

export const search = ({ word, date, qnt = '500' }) => async (dispatch) => {
  try {
    const result = await axios({
      method: 'post',
      url: BACKEND.search,
      data: {
        ...word,
        qnt,
        date: date.toISOString()
      }
    });

    dispatch({
      type: Types.GET,
      data: result.data
    });
  } catch (error) {
    console.log('search error', error);
    dispatch({
      type: Types.ERROR,
      data: 'search'
    });
  }
};

const initialState = {
  news: [],
  error: ''
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.GET:
      return {
        ...state,
        news: action.data
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
