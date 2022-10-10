import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import CheckModals from "./components/checks/CheckModals";
import CheckMetamask from "./components/checks/CheckMetamask";
import { store } from "./store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <CheckMetamask>
        <CheckModals>
          <App />
        </CheckModals>
      </CheckMetamask>
    </Provider>
  </React.StrictMode>
);
