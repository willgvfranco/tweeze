import axios from 'axios';

import BACKEND from '../config/env';

export const Types = {
  GET: 'news/GET',
  STATUS: 'news/STATUS',
  CLEAR_STATUS: 'news/CLEAR_STATUS'
};

export const clearStatus = () => (dispatch) => {
  dispatch({
    type: Types.CLEAR_STATUS
  });
};

export const search = ({ word, beginDate, endDate, qnt, from = 0 }) => async (
  dispatch,
  getState
) => {
  clearStatus()(dispatch);
  const { news } = getState().news;

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
      type: Types.STATUS,
      data: {
        type: 'error',
        description: 'search',
        msg: 'Erro ao buscar as notícias! Por favor, tente novamente'
      }
    });
  }
};

const initialState = {
  news: [],
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
        news: action.data
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
