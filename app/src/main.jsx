import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import CheckMetamask from "./components/checks/CheckMetamask";
import CheckModals from "./components/checks/CheckModals";
import CheckAlert from "./components/checks/CheckAlert";
import CheckNetwork from './components/checks/CheckNetwork';
import CheckOrganizer from './components/checks/CheckOrganizer.jsx';

import { store } from "./store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <CheckMetamask>
        <CheckNetwork>
          <CheckOrganizer>
            <CheckModals>
              <CheckAlert>
                <App />
              </CheckAlert>
            </CheckModals>
          </CheckOrganizer>
        </CheckNetwork>
      </CheckMetamask>
    </Provider>
  </React.StrictMode>
);
