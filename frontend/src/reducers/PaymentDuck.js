import axios from 'axios';

import BACKEND from '../config/env';

export const Types = {
  STATUS: 'payment/STATUS',
  CLEAR_STATUS: 'payment/CLEAR_STATUS',
  REFUSE: 'payment/REFUSE'
};

export const clearStatus = () => (dispatch) => {
  dispatch({
    type: Types.CLEAR_STATUS
  });
};

export const sendPayment = ({ card, user, plan }) => async (
  dispatch,
  getState
) => {
  clearStatus()(dispatch);
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
        plan,
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
      data: {
        type: 'success',
        description: 'sendPayment',
        msg: 'Pagamento enviado com sucesso!'
      }
    });
  } catch (error) {
    console.log('sendPayment error', error);
    if (error?.response?.status === 406) {
      dispatch({
        type: Types.STATUS,
        data: {
          type: 'error',
          description: 'sendPayment/wrongCard',
          msg: 'Cartão incorreto!'
        }
      });
      return;
    }
    dispatch({
      type: Types.STATUS,
      data: {
        type: 'error',
        description: 'sendPayment',
        msg: 'Erro ao enviar o pagamento'
      }
    });
  }
};

export const refusePayment = () => (dispatch) => {
  dispatch({
    type: Types.REFUSE,
    data: true
  });
};

export const initialState = {
  status: {
    type: '',
    description: '',
    msg: ''
  },
  refuse: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
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
    case Types.REFUSE:
      return {
        ...state,
        refuse: action.data
      };
    default:
      return state;
  }
}
