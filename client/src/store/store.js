import { compose, createStore, applyMiddleware } from 'redux';
import rootReducer from '../_reducers/index';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(promiseMiddleware, ReduxThunk)),
);

export default store;
