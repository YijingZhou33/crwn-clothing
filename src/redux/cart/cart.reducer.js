/* 
  Trigger cart dropdown to hide and show based on clicking
  on the cart icon. 
*/

import CartActionTypes from "./cart.types";
import { addItemToCart, removeItemFromCart } from "./cart.utils";

// hide the dropdown when the app renders for the first time
/* 
  Similar to local state inside the class component
  set `cartItems` as an empty array as the default value
  
  Add or clear items in the array depending on the feature 
    Add new actions / action types 

  When we add items, it will increase the quantity
  first, let's start with adding items into the array whenever
  the user click them
  deposit whatever the item it is in the payload of the
  `ADD_ITEM` action, push it into `cartItems` array

  Group the cartItem - add quantity property to the object 
  write a utils function to return a new array even if the object
  stays the same but increases or decreases the prop. 

  dispatch a new action based on the payload to clear an cartItem 
  regardless of its quantity whenever we hit th remove button
*/
const INITIAL_STATE = {
  hidden: true,
  cartItems: [],
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden,
      };
    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload),
        // cartItems: [...state.cartItems, action.payload],
      };
    case CartActionTypes.REMOVE_ITEM:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, action.payload),
      };
    case CartActionTypes.CLEAR_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};

export default cartReducer;
