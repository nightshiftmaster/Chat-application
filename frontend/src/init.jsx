import App from "./App";

import store from "./slices";
import { Provider } from "react-redux";
import "./i18n";

const init = async () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default init;
