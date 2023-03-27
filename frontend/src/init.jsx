import { io } from 'socket.io-client';
import './i18n';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, ErrorBoundary } from '@rollbar/react';
import { Provider as ProviderRedux } from 'react-redux';
import App from './components/App';
import store from './slices';
import { addMessage } from './slices/messagesSlice';
import {
  addChannel, renameChannel, removeChannel,
} from './slices/channelsSlice';

const socket = io();

const { dispatch } = store;

socket.on('newMessage', (message) => {
  dispatch(addMessage(message));
});

socket.on('newChannel', (payload) => {
  dispatch(addChannel(payload));
});

socket.on('renameChannel', (payload) => {
  const { id, name } = payload;
  dispatch(renameChannel({ id, changes: { name } }));
});

socket.on('removeChannel', (payload) => {
  dispatch(removeChannel(payload));
});

const init = async () => (
  <ProviderRedux store={store}>
    <App />
  </ProviderRedux>
);

const rollbarConfig = {
  accessToken: process.env.REACT_APP_SECRET_TOKEN,
  environment: process.env.NODE_ENV,
};

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <Provider config={rollbarConfig}>
      <ErrorBoundary>{await init()}</ErrorBoundary>
    </Provider>,
  );
};

export { app, socket };
