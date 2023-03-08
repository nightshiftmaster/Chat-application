import App from "./App";

import "./i18n";
import { Provider, ErrorBoundary } from "@rollbar/react";

const rollbarConfig = {
  accessToken: "f7631b7d3d50493083cb2438ac4c5681",
  environment: "production",
};

const init = async () => {
  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Provider>
  );
};

export default init;
