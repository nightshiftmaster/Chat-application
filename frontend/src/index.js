import ReactDOM from "react-dom/client";
import React from "react";
import "./index.css";
import init from "./init";
import { Provider, ErrorBoundary } from "@rollbar/react";

var rollbarConfig = {
  environment: "production",
};

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <Provider config={rollbarConfig}>
      <ErrorBoundary>{await init()}</ErrorBoundary>
    </Provider>
  );
};

app();
