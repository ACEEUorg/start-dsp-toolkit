import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router";
import { I18nProvider } from "./i18n/I18nContext";
import App from "./App.jsx";
import "flag-icons/css/flag-icons.min.css";
import "./index.css";

// Don't render React app if we're on the admin page
// The admin page is a standalone HTML file that loads Decap CMS
if (!window.location.pathname.startsWith("/admin")) {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <I18nProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </I18nProvider>
    </React.StrictMode>,
  );
}
