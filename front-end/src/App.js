import React from "react";
import { Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import history from "./services/history";
import GlobalStyles from "../src/styles/GlobalStyles";
import Header from "./components/Header";
import Routes from "./routes";

function App() {
  return (
    <Router history={history}>
      <Header />
      <Routes />
      <GlobalStyles />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
      />
    </Router>
  );
}

export default App;
