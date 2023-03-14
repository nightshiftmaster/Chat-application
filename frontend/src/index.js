import ReactDOM from 'react-dom/client';
import { Provider, ErrorBoundary } from '@rollbar/react';
import init from './init';

const rollbarConfig = {
  accessToken: 'f7631b7d3d50493083cb2438ac4c5681',
  environment: 'production',
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
