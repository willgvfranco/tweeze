import axios from 'axios';

// Action Types

export const Types = {
  LOGIN: 'auth/LOGIN',
  LOGOUT: 'auth/LOGOUT'
};

// Action Creators

export function login(form) {
  const response = axios
    .post('http://localhost:8000/api/v1/accounts/login/', form)
    .then((response) => {
      console.log(response);
    });
  return {
    type: Types.LOGIN,
    payload: {
      response
    }
  };
}

export function logout() {
  return {
    type: Types.LOGOUT
  };
}

// Reducer

const initialState = {
  isLogged: false,
  token: null,
  user: {}
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.LOGIN:
      return {
        ...state,
        auth: action.payload
      };
    case Types.LOGOUT:
      return {
        ...state,
        auth: action.payload
      };
    default:
      return state;
  }
}
