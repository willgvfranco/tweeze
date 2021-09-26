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

    const total = result.data.hits?.total.value;
    const resultNews = result.data.hits.hits;

    if (from !== 0) {
      dispatch({
        type: Types.GET,
        data: {
          news: news.concat(resultNews),
          total
        }
      });
      return;
    }
    dispatch({
      type: Types.GET,
      data: {
        news: resultNews,
        total
      }
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
  total_news: 0,
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
        news: action.data.news,
        total_news: action.data.total
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
