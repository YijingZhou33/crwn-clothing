import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./redux/store";

import "./index.css";
import App from "./App";

/* 
  put new components here that we get from React redux
  give access to app state and reducer

  Provider is a component that is the parent of everything inside the application
  the entire application will have access to the store object
  the store is where to put all Redux code

  Wrap the application inside <PersistGate> so it can access the
  presistence flow itself. 
    1. receive the store
    2. fire off the actions that will rehydrate the state 
      whenever the application refreshes
*/

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
