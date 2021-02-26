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
*/

import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import logger from "redux-logger";

import rootReducer from "./root-reducer";

const middlewares = [logger];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);
