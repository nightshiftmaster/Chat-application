import React from 'react';
import { Provider } from 'react-redux';
import App from './App';
import store from './slices';
import './i18n';

const init = async () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default init;
