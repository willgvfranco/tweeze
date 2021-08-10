import axios from 'axios';

import BACKEND from '../config/env';

export const Types = {
  LOGIN: 'auth/LOGIN',
  LOGIN_TOKEN: 'auth/LOGIN_TOKEN',
  LOGIN_SOCIAL: 'auth/LOGIN_SOCIAL',
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

    localStorage.setItem('token', JSON.stringify(accessToken));

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
};

export const loginWithToken = (token) => async (dispatch) => {
  try {
    const result = await axios({
      method: 'get',
      url: BACKEND.loginToken,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      }
    });

    const { id, accessToken } = result.data;

    localStorage.setItem('token', JSON.stringify(accessToken));

    dispatch({
      type: Types.LOGIN_TOKEN,
      data: {
        user: id,
        token: accessToken
      }
    });
  } catch (error) {
    console.log('loginWithToken error', error);
    if (error.response.status === 401) {
      localStorage.clear('token');
    }
    dispatch({
      type: Types.ERROR,
      data: 'loginWithToken'
    });
  }
};

export const loginWithSocialMedia = (user) => async (dispatch) => {
  console.log('user', user);
  try {
    const result = await axios({
      method: 'post',
      url: BACKEND.loginToken,
      data: {
        email: user.profile.email,
        first_name: user.profile.firstName,
        last_name: user.profile.lastName,
        provider: user.provider
      }
    });

    const { id, accessToken } = result.data;

    localStorage.setItem('token', JSON.stringify(accessToken));

    dispatch({
      type: Types.LOGIN_SOCIAL,
      data: {
        user: id,
        token: accessToken
      }
    });
  } catch (error) {
    console.log('loginWithSocialMedia error', error);
    dispatch({
      type: Types.ERROR,
      data: 'loginWithSocialMedia'
    });
  }
};

export function logout() {
  return {
    type: Types.LOGOUT
  };
}

export const initialState = {
  isLogged: false,
  token: null,
  user: '',
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
    case Types.LOGIN_TOKEN:
      return {
        ...state,
        user: action.data.user,
        token: action.data.token,
        isLogged: true
      };
    case Types.LOGIN_SOCIAL:
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
    case Types.ERROR:
      return {
        ...state,
        error: action.data
      };
    default:
      return state;
  }
}
