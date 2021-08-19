import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import user from './user_reducer';
import article from './article_reducer';
import admin from './admin_reducer';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  user,
  article,
  admin,
});

export default persistReducer(persistConfig, rootReducer);
