/* 
  Trigger cart dropdown to hide and show based on clicking
  on the cart icon. 
*/

import CartActionTypes from "./cart.types";

// hide the dropdown when the app renders for the first time
const INITIAL_STATE = {
  hidden: true,
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden,
      };
    default:
      return state;
  }
};

export default cartReducer;
