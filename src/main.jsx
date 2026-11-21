import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import "./i18n";
import OfflineGate from './components/OfflineGate.jsx';
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
        <OfflineGate/>
    </BrowserRouter>
  </React.StrictMode>
);
