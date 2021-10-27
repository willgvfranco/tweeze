import axios from 'axios';

import BACKEND from '../config/env';

export const Types = {
  STATUS: 'contact/STATUS',
  CLEAR_STATUS: 'contact/CLEAR_STATUS'
};

export const clearStatus = () => (dispatch) => {
  dispatch({
    type: Types.CLEAR_STATUS
  });
};

export const sendForm = (contact) => async (dispatch) => {
  clearStatus()(dispatch);

  try {
    await axios({
      method: 'post',
      url: BACKEND.mail,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        from: contact.email,
        subject: 'Formulário de contato - Plano Ilimitado sob consulta',
        text: `Nome: ${contact.name}, Empresa: ${contact.company}, Cargo: ${
          contact.job
        }, Telefone: ${contact.phone},
          conteúdo da mensagem: ${contact.message},
          monitoramento de sites jornalísticos: ${
            contact.features.news ? 'sim' : 'não'
          },
          monitoramento de mídias sociais: ${
            contact.features.social ? 'sim' : 'não'
          },
          monitoramento de rádio: ${contact.features.radio ? 'sim' : 'não'},
          monitoramento de televisão: ${contact.features.tv ? 'sim' : 'não'},
          
          `
      }
    });

    dispatch({
      type: Types.STATUS,
      data: {
        type: 'success',
        description: 'sendForm',
        msg: 'Formulário enviado com sucesso!'
      }
    });
  } catch (error) {
    console.log('sendForm error', error);
    dispatch({
      type: Types.STATUS,
      data: {
        type: 'error',
        description: 'sendForm',
        msg: 'Erro ao enviar o formulário!'
      }
    });
  }
};

export const initialState = {
  status: {
    type: '',
    description: '',
    msg: ''
  }
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
    default:
      return state;
  }
}
