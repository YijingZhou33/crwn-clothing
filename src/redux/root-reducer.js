/* 
    Root reducer object represents all states of the application
    combine other states together - break code up into individual sections

    root reducer - combinedReducers
      key: individual slice of state (actual reducer)

*/

import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
// actual localStorage on the browser
import storage from "redux-persist/lib/storage";

import userRecuder from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
import directoryReducer from "./directory/directory.reducer";
import shopReducer from "./shop/shop.reducer";

/* 
  JSON object of configuration for "redux-persist"
  key: 'At what point inside the reducer object do we 
      want to start storing everything',
  storage: storage redux-persist will use
  whitelist: an array containing the string names of any of the
          reducer that we want to store

  We have two reducer, but `user` is handled by firebase
*/
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const rootReducer = combineReducers({
  user: userRecuder,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer,
});

// persistReducer() and pass in configuration and rootReducer
// modified version of rootReducer with persistence capabilities
export default persistReducer(persistConfig, rootReducer);
