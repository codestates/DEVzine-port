import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './style.css';
import App from './App';
import store from './store/store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import ScrollToTop from './utils/scrollToTop';
const persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ScrollToTop />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
