import axios from 'axios';

import BACKEND from '../config/env';

export const Types = {
  LOGIN: 'auth/LOGIN',
  LOGOUT: 'auth/LOGOUT',
  ERROR: 'auth/ERROR'
};

export const login = (data) => async (dispatch) => {
  try {
    const result = await axios({
      method: 'post',
      url: BACKEND.login,
      data
    });

    const { id, accessToken } = result.data;
    persistState({
      user: id,
      token: accessToken
    });

    dispatch({
      type: Types.LOGIN,
      data: {
        user: id,
        token: accessToken
      }
    });
  } catch (error) {
    console.log('login error', error);
    dispatch({
      type: Types.ERROR,
      data: 'login'
    });
  }
  return {
    type: Types.LOGIN,
    payload: data
  };
};

export const loginWithState = (auth) => (dispatch) => {
  auth &&
    dispatch({
      type: Types.LOGIN,
      data: {
        user: auth.user,
        token: auth.token
      }
    });
};

export function logout() {
  return {
    type: Types.LOGOUT
  };
}

const persistState = (auth) => {
  sessionStorage.setItem('auth', JSON.stringify(auth));
};

export const getPersistedState = () => {
  try {
    return JSON.parse(sessionStorage.getItem('auth'));
  } catch (e) {
    console.warn('Unable to get a persist state to sessionStorage:', e);
    return {};
  }
};

const initialState = {
  isLogged: false,
  token: null,
  user: {},
  error: ''
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.LOGIN:
      return {
        ...state,
        user: action.data.user,
        token: action.data.token,
        isLogged: true
      };
    case Types.LOGOUT:
      return {
        ...state,
        isLogged: false,
        token: null,
        user: {}
      };
    default:
      return state;
  }
}
