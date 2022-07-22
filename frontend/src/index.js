import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./index.css"
import "./assets/vendor/nucleo/css/nucleo.css";
import "./assets/vendor/font-awesome/css/font-awesome.min.css";
import "./assets/scss/argon-design-system-react.scss?v1.1.0";


import App from "./App.js"

ReactDOM.render(
  <>
  <App />
    </>,
  document.getElementById('root')
);