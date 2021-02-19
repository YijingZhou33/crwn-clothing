import CartActionTypes from "./cart.types";

/* 
  payload is an optional property 
  Inside the `reducer`, we're not using it, no need to pass in.
*/
export const toggleCartHidden = () => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN,
});
