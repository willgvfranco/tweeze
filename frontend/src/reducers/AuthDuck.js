import axios from 'axios';

import BACKEND from '../config/env';

export const Types = {
  LOGIN: 'auth/LOGIN',
  LOGIN_TOKEN: 'auth/LOGIN_TOKEN',
  LOGIN_SOCIAL: 'auth/LOGIN_SOCIAL',
  SIGNUP: 'auth/SIGNUP',
  LOGOUT: 'auth/LOGOUT',
  STATUS: 'auth/STATUS',
  CLEAR_STATUS: 'auth/CLEAR_STATUS',
  LOADING: 'auth/LOADING'
};

const setLoading = (status, dispatch) => {
  dispatch({
    type: Types.LOADING,
    data: status
  });
};

export const clearStatus = () => (dispatch) => {
  dispatch({
    type: Types.CLEAR_STATUS
  });
};

export const setStatus = ({ type, description, msg }) => (dispatch) => {
  dispatch({
    type: Types.STATUS,
    data: { type, description, msg }
  });
};

export const login = (data) => async (dispatch) => {
  clearStatus()(dispatch);
  try {
    const result = await axios({
      method: 'post',
      url: BACKEND.login,
      data
    });

    const { accessToken } = result.data;

    localStorage.setItem('accessToken', JSON.stringify(accessToken));

    dispatch({
      type: Types.LOGIN,
      data: result.data
    });
  } catch (error) {
    console.log('login error', error);

    if (error?.response?.status === 401) {
      dispatch({
        type: Types.STATUS,
        data: {
          type: 'error',
          description: 'login/unauthorized',
          msg: 'Email e/ou senha incorretos!'
        }
      });
      return;
    }

    dispatch({
      type: Types.STATUS,
      data: {
        type: 'error',
        description: 'login',
        msg: 'Erro ao fazer login! Por favor, tente novamente'
      }
    });
  }
};

export const loginWithToken = (accessToken) => async (dispatch) => {
  clearStatus()(dispatch);
  setLoading(true, dispatch);
  try {
    const result = await axios({
      method: 'get',
      url: BACKEND.loginToken,
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      }
    });

    const { accessToken: newToken } = result.data;

    localStorage.setItem('accessToken', JSON.stringify(newToken));

    dispatch({
      type: Types.LOGIN_TOKEN,
      data: result.data
    });
    setLoading(false, dispatch);
  } catch (error) {
    console.log('loginWithToken error', error);
    if (error?.response?.status === 401) {
      localStorage.clear('accessToken');
    }
    dispatch({
      type: Types.STATUS,
      data: {
        type: 'error',
        description: 'loginWithToken',
        msg: 'Erro ao fazer login! Por favor, tente novamente'
      }
    });
    setLoading(false, dispatch);
  }
};

export const loginWithSocialMedia = (user) => async (dispatch) => {
  clearStatus()(dispatch);
  try {
    const result = await axios({
      method: 'post',
      url: BACKEND.loginSocial,
      data: {
        email: user.profile.email,
        first_name: user.profile.firstName,
        last_name: user.profile.lastName,
        provider: user.provider
      }
    });

    const { accessToken } = result.data;

    localStorage.setItem('accessToken', JSON.stringify(accessToken));

    dispatch({
      type: Types.LOGIN_SOCIAL,
      data: result.data
    });
  } catch (error) {
    console.log('loginWithSocialMedia error', error);
    dispatch({
      type: Types.STATUS,
      data: {
        type: 'error',
        description: 'loginWithSocialMedia',
        msg: 'Erro ao fazer login! Por favor, tente novamente'
      }
    });
  }
};

export const register = (data) => async (dispatch) => {
  clearStatus()(dispatch);
  try {
    const result = await axios({
      method: 'post',
      url: BACKEND.cadastro,
      data
    });

    const { accessToken } = result.data;

    localStorage.setItem('accessToken', JSON.stringify(accessToken));

    dispatch({
      type: Types.STATUS,
      data: {
        type: 'success',
        description: 'register',
        msg: 'Conta criada com sucesso!'
      }
    });

    dispatch({
      type: Types.SIGNUP,
      data: result.data
    });
  } catch (error) {
    console.log('login error', error);
    dispatch({
      type: Types.STATUS,
      data: {
        type: 'error',
        description: 'register',
        msg: 'Erro ao fazer cadastro! Por favor, tente novamente'
      }
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('accessToken');

  dispatch({
    type: Types.LOGOUT
  });
};

export const passwordEmailSend = (email) => async (dispatch) => {
  clearStatus()(dispatch);
  try {
    const result = await axios({
      method: 'post',
      url: BACKEND.password,
      data: {
        email
      }
    });

    if (result.status === 200) {
      dispatch({
        type: Types.STATUS,
        data: {
          type: 'success',
          description: 'passwordEmailSend',
          msg: 'E-mail enviado!'
        }
      });
    }
  } catch (error) {
    console.log('passwordEmailSend error', error);
    if (error?.response?.status === 400) {
      dispatch({
        type: Types.STATUS,
        data: {
          type: 'error',
          description: 'passwordEmailSend/email',
          msg: 'E-mail não cadastrado!'
        }
      });
      return;
    }
    dispatch({
      type: Types.STATUS,
      data: {
        type: 'error',
        description: 'passwordEmailSend',
        msg: 'E-mail ao enviar e-mail! Por favor, tente novamente'
      }
    });
  }
};

export const passwordChange = ({ password, accessToken }) => async (
  dispatch
) => {
  clearStatus()(dispatch);
  try {
    const result = await axios({
      method: 'post',
      url: BACKEND.passwordChange,
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      },
      data: {
        password
      }
    });

    if (result.status === 200) {
      dispatch({
        type: Types.STATUS,
        data: {
          type: 'success',
          description: 'passwordChange',
          msg: 'Senha alterada com sucesso!'
        }
      });
    }
  } catch (error) {
    console.log('passwordChange error', error);
    if (error?.response?.status === 401) {
      dispatch({
        type: Types.STATUS,
        data: {
          type: 'error',
          description: 'passwordChange/token',
          msg: 'Token de autorização inválido'
        }
      });
      return;
    }
    dispatch({
      type: Types.STATUS,
      data: {
        type: 'error',
        description: 'passwordChange',
        msg: 'Erro ao enviar a solicitação.. Tente novamente mais tarde'
      }
    });
  }
};

export const changePersonalInfo = (info) => async (dispatch, getState) => {
  clearStatus()(dispatch);
  const { accessToken } = getState().auth;

  try {
    const result = await axios({
      method: 'post',
      url: BACKEND.dados,
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      },
      data: { ...info }
    });

    const { accessToken: newToken } = result.data;

    localStorage.setItem('accessToken', JSON.stringify(newToken));

    dispatch({
      type: Types.STATUS,
      data: {
        type: 'success',
        description: 'changePersonalInfo',
        msg: 'Alteração feita com sucesso!'
      }
    });

    dispatch({
      type: Types.LOGIN,
      data: result.data
    });
  } catch (error) {
    console.log('changePersonalInfo error', error);
    dispatch({
      type: Types.STATUS,
      data: {
        type: 'error',
        description: 'changePersonalInfo',
        msg: 'Erro ao alterar as informações! Por favor, tente novamente'
      }
    });
  }
};

export const initialState = {
  isLogged: false,
  accessToken: null,
  id: '',
  loading: false,
  email: '',
  data_nascimento: null,
  first_name: '',
  last_name: '',
  cpf: '',
  telefone: '',
  endereco: '',
  complemento: '',
  cep: '',
  roles: [],
  status: {
    type: '',
    description: '',
    msg: ''
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.LOGIN:
      return {
        ...state,
        ...action.data,
        isLogged: true,
        error: ''
      };
    case Types.LOGIN_TOKEN:
      return {
        ...state,
        ...action.data,
        isLogged: true,
        error: ''
      };
    case Types.LOGIN_SOCIAL:
      return {
        ...state,
        ...action.data,
        isLogged: true,
        error: ''
      };
    case Types.SIGNUP:
      return {
        ...state,
        ...action.data,
        isLogged: true,
        error: ''
      };
    case Types.LOGOUT:
      return {
        ...state,
        isLogged: false,
        accessToken: null,
        id: {},
        error: ''
      };
    case Types.LOADING:
      return {
        ...state,
        loading: action.data
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
