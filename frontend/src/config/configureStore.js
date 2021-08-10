import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';

import reducers from '../reducers';
import { initialState } from '../reducers/AuthDuck';

const persistedState = () => {
  try {
    const token = localStorage.getItem('token');
    if (token === null) {
      return null;
    }

    return JSON.parse(token);
  } catch (error) {
    return null;
  }
};

export default function configureStore() {
  return createStore(
    combineReducers({
      ...reducers
    }),
    { auth: { ...initialState, token: persistedState() } },
    composeWithDevTools(applyMiddleware(ReduxThunk))
  );
}
