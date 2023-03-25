import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, ErrorBoundary } from '@rollbar/react';
import init from './utils/init';

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

app();
