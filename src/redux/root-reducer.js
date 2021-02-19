/* 
    Root reducer object represents all states of the application
    combine other states together - break code up into individual sections

    root reducer - combinedReducers
      key: individual slice of state (actual reducer)

*/

import { combineReducers } from "redux";

import userRecuder from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";

export default combineReducers({
  user: userRecuder,
  cart: cartReducer,
});
