import { createStore, combineReducers, applyMiddleware } from 'redux';
import reducers from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';

export default function configureStore() {
  return createStore(
    combineReducers({
      ...reducers
    }),
    composeWithDevTools(applyMiddleware(ReduxThunk))
  );
}
