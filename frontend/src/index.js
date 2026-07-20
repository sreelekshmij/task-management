import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./styles/global.scss";
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      theme="light"
    />
  </React.StrictMode>
);