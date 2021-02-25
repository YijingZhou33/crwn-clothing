import React from "react";
import { connect } from "react-redux";

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
  `mapStateToProps` gets called every single time and passes in new props into 
  component. This is always re-rendering components. 

  For example, if we sign in, it still changes the entire state, 
  even though cart icon only cares about cartItem, it sill re-renders. 

  Store the value the selector is using, if the cartItems doesn't change, 
  we don't want to re-render the cartIcon component.

  Memorization: the caching of the selectors value
  `Reselect` library - it won't pass the same prop value into component, 
                        React component won't re-render

  Move this into `cart.selectors.js`
  It needs to pass the whole state:
    selectCartItemsCount --> selectCartItems --> selectCart --> state
*/
const mapStateToProps = (state) => ({
  itemCount: selectCartItemsCount(state),
});

// merge `toggleCarHidden` props to Redux state
const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
