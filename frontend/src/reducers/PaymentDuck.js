import axios from 'axios';

import BACKEND from '../config/env';

export const Types = {
  ERROR: 'payment/ERROR',
  STATUS: 'payment/STATUS'
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

export const initialState = {
  error: '',
  status: ''
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
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
    default:
      return state;
  }
}
