import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";

import store from "./redux/store";

/* 
  put new components here that we get from React redux
  give access to app state and reducer

  Provider is a component that is the parent of everything inside the application
  the entire application will have access to the store object
  the store is where to put all Redux code
*/

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
