/* 
  Middleware - array: between action and root reducer 
    function that receives actions in, do something with them, and pass them to root reducer


  Redux-logger
    catch the action and console.log it 

  function createStore takes two props:
    1. rootReducer
    2. applyMiddleware 
      spread all of the methods in middlewares array as individual function 
      in this way, if we need to add more things to middleware, just add to array
      more scalable 

  redux-persist
    allow the browser to cache the store 
    use `presistor` to create a persisting version of store

  Only apply `logger` when we in development
  Inside Node, there's an enviromnment variable, 
  it can be set to know whether we're in production or development 

  yarn start -- development
  yarn build (heroku) -- production
*/

import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import logger from "redux-logger";

import rootReducer from "./root-reducer";

// const middlewares = [logger];
const middlewares = [];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);
