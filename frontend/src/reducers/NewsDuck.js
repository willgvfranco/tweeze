import axios from 'axios';

import BACKEND from '../config/env';

export const Types = {
  GET: 'news/GET',
  ERROR: 'news/ERROR'
};

export const search = ({ word, beginDate, endDate, qnt, from = 0 }) => async (
  dispatch,
  getState
) => {
  const { news } = getState().news;
  console.log('from', from);
  try {
    const result = await axios({
      method: 'post',
      url: BACKEND.search,
      data: {
        ...word,
        qnt,
        from,
        beginDate: new Date(beginDate).toISOString(),
        endDate: new Date(endDate).toISOString()
      }
    });

    console.log('result.data', result.data);
    if (from !== 0) {
      dispatch({
        type: Types.GET,
        data: news.concat(result.data.hits.hits)
      });
      return;
    }
    dispatch({
      type: Types.GET,
      data: result.data.hits.hits
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
