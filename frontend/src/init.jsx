import App from "./App";

import store from "./slices";
import { Provider as ReduxProvider } from "react-redux";
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
        {" "}
        <ReduxProvider store={store}>
          <App />
        </ReduxProvider>{" "}
      </ErrorBoundary>
    </Provider>
  );
};

export default init;
