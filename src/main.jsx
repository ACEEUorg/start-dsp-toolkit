import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router";
import { I18nProvider } from "./i18n/I18nContext";
import App from "./App.jsx";
import "flag-icons/css/flag-icons.min.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <I18nProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </I18nProvider>
  </React.StrictMode>,
);
