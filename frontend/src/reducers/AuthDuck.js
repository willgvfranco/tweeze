import axios from 'axios';
// Action Types

export const Types = {
  LOGIN: 'auth/LOGIN',
  LOGOUT: 'auth/LOGOUT'
};

// Action Creators

export function login(data) {
  return {
    type: Types.LOGIN,
    payload: data
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
        user: action.payload,
        token: action.payload.accessToken,
        isLogged: true
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
