import { createSelector } from "reselect";

/* 
  inputSelector: doesn't use `createSelector`
  outputSelector: use `createSelector` and `inputSelector`
*/

/* 
  inputSelector: select`Slice`
    take the whole state and returns one-layer deep slice
*/
const selectCart = (state) => state.cart;

/* 
  outputSelector: select`Prop`
    first argument: a collection(array) of inputSelector
    second argument: a function takes the Selector value (in order)
    and returns the value we want
*/

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectCartHidden = createSelector(
  [selectCart],
  (cart) => cart.hidden
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (accumalatedQuantity, cartItem) =>
        accumalatedQuantity + cartItem.quantity,
      0
    )
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (accumalatedTotal, cartItem) =>
      accumalatedTotal + cartItem.quantity * cartItem.price,
    0
  )
);
