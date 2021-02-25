import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { toggleCartHidden } from "../../redux/cart/cart.actions";

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import { selectCartItemsCount } from "../../redux/cart/cart.selectors";

import "./cart-icon.styles.scss";

/* 
  The returned object of the `mapDispatchToProps` function 
  will be merged to connected components as props. 
  Call them directly to dispatch its action.
*/
const CartIcon = ({ toggleCartHidden, itemCount }) => (
  <div className='cart-icon' onClick={toggleCartHidden}>
    <ShoppingIcon className='shopping-icon' />
    <span className='item-count'>{itemCount}</span>
  </div>
);

/* 
  Selector: use `mapStateToProps` to pull the state in and get a slice of value
    display the number of items in the cart inside the cart icon
    array.reducer() to accumulate the total number
    pass `itemCount` parameter into CartIcon component
    computing a new value based off the whole state

  Whenever any reducer updates, it will always return a new object,
  Redux re-composes and re-bulids the entire state objects.
  
  `mapStateToProps` has a shallow equality check for every value in the object,
    shallow equality check:
      primitive value - two values are equal?
      object value - reference not the value inside

  Since `itemCount` prop is a primitive value, if they're the same, 
  no new props will be passed into `cartIcon` component.
  
  Thus, `cartIcon` will not rerender if unrelated redux state 
  like `currrentUser` changes occur. 

  Memorization: the caching of the selectors value
  `Reselect` library - it won't pass the same prop value into component, 
                        React component won't re-render

  Even BEFORE reselect, changes to unrelated redux state will NOT
  re-render `CartIcon` since `itemCount` is a primitive value.
  However, if a selector were creating new objects/arrays, 
  it will help prevent unnecessary re-renders.

  In this scenario, reselect only helped with unnecessary computations
  from array.reduce function since `CartItems` passed in didn't change.

  Move this into `cart.selectors.js`
  It needs to pass the whole state:
    selectCartItemsCount --> selectCartItems --> selectCart --> state
*/
const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemsCount,
});

// merge `toggleCarHidden` props to Redux state
const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
