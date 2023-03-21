import React from 'react';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import App from './App';
import store from './slices';
import './i18n';

const socket = io();

const init = async () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export { init, socket };
