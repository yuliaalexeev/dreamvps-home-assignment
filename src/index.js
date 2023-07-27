import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./styles/globals.scss";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <Router>
    <React.StrictMode>
      <App />
      <ToastContainer position="top-right" autoClose={1000} />
    </React.StrictMode>
  </Router>
);
