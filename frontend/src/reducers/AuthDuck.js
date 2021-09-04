import axios from 'axios';

import BACKEND from '../config/env';

export const Types = {
  LOGIN: 'auth/LOGIN',
  LOGIN_TOKEN: 'auth/LOGIN_TOKEN',
  LOGIN_SOCIAL: 'auth/LOGIN_SOCIAL',
  PASSWORD: 'auth/PASSWORD',
  SIGNUP: 'auth/SIGNUP',
  LOGOUT: 'auth/LOGOUT',
  ERROR: 'auth/ERROR',
  LOADING: 'auth/LOADING',
  STATUS: 'auth/STATUS'
};

export const login = (data) => async (dispatch) => {
  dispatch({
    type: Types.ERROR,
    data: ''
  });

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
        type: Types.ERROR,
        data: 'unauthorized'
      });
      return;
    }

    dispatch({
      type: Types.ERROR,
      data: 'login'
    });
  }
};

export const loginWithToken = (accessToken) => async (dispatch) => {
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
      type: Types.ERROR,
      data: 'loginWithToken'
    });
    setLoading(false, dispatch);
  }
};

export const loginWithSocialMedia = (user) => async (dispatch) => {
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
      type: Types.ERROR,
      data: 'loginWithSocialMedia'
    });
  }
};

export const register = (data) => async (dispatch) => {
  try {
    const result = await axios({
      method: 'post',
      url: BACKEND.cadastro,
      data
    });

    const { accessToken } = result.data;

    localStorage.setItem('accessToken', JSON.stringify(accessToken));

    dispatch({
      type: Types.SIGNUP,
      data: result.data
    });
  } catch (error) {
    console.log('login error', error);
    dispatch({
      type: Types.ERROR,
      data: 'login'
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
  dispatch({
    type: Types.PASSWORD,
    data: ''
  });
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
        type: Types.PASSWORD,
        data: 'ok'
      });
    }
  } catch (error) {
    console.log('passwordEmailSend error', error);
    if (error?.response?.status === 400) {
      dispatch({
        type: Types.PASSWORD,
        data: 'email'
      });
    }
    dispatch({
      type: Types.ERROR,
      data: 'passwordEmailSend'
    });
  }
};

export const passwordChange = ({ password, accessToken }) => async (
  dispatch
) => {
  dispatch({
    type: Types.PASSWORD,
    data: ''
  });
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
        type: Types.PASSWORD,
        data: 'password'
      });
    }
  } catch (error) {
    console.log('passwordChange error', error);
    if (error?.response?.status === 401) {
      dispatch({
        type: Types.PASSWORD,
        data: 'passwordError'
      });
    }
    dispatch({
      type: Types.ERROR,
      data: 'passwordChange'
    });
  }
};

export const setStatus = (status) => (dispatch) => {
  dispatch({
    type: Types.PASSWORD,
    data: status
  });
};

const setLoading = (status, dispatch) => {
  dispatch({
    type: Types.LOADING,
    data: status
  });
};

export const changePersonalInfo = (info) => async (dispatch, getState) => {
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
      type: Types.LOGIN,
      data: result.data
    });
  } catch (error) {
    console.log('changePersonalInfo error', error);
    dispatch({
      type: Types.ERROR,
      data: 'changePersonalInfo'
    });
  }
};

export const sendPayment = ({ card, user }) => async (dispatch, getState) => {
  const { accessToken, email } = getState().auth;
  const phone = card.phone.replace('-', '');
  const cardCpf = card.cpf.replaceAll('.', '').replace('-', '');
  const userCpf = user?.cpf.replaceAll('.', '').replace('-', '');

  try {
    await axios({
      method: 'post',
      url: BACKEND.pagamento,
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      },
      data: {
        cardName: card.name,
        cardCpf,
        cardNumber: card.number,
        userName: user?.name || card.name,
        cardBrand: card.brand,
        cardCvv: card.cvv,
        cardExpirationMonth: card.expire.slice(0, 2),
        cardExpirationYear: card.expire.slice(3, 7),
        cpf: userCpf || cardCpf,
        birthday: new Date(card.birthday).toLocaleDateString(),
        areaCode: card.phone.slice(1, 3),
        phone: phone.slice(5, 14),
        userEmail: email
      }
    });
    dispatch({
      type: Types.STATUS,
      data: 'paymentSuccess'
    });
  } catch (error) {
    console.log('sendPayment error', error);
    if (error?.response?.status === 406) {
      dispatch({
        type: Types.ERROR,
        data: 'wrongCard'
      });
    } else {
      dispatch({
        type: Types.ERROR,
        data: 'sendPayment'
      });
    }
  }
};

export const resetErrorState = () => (dispatch) => {
  dispatch({
    type: Types.ERROR,
    data: ''
  });
};

export const resetStatusState = () => (dispatch) => {
  dispatch({
    type: Types.STATUS,
    data: ''
  });
};

export const initialState = {
  isLogged: false,
  accessToken: null,
  id: '',
  error: '',
  status: '',
  loading: false
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
    case Types.PASSWORD:
      return {
        ...state,
        status: action.data,
        error: ''
      };
    case Types.STATUS:
      return {
        ...state,
        status: action.data
      };
    case Types.ERROR:
      return {
        ...state,
        error: action.data,
        isLogged: false
      };
    case Types.LOADING:
      return {
        ...state,
        loading: action.data
      };
    default:
      return state;
  }
}
