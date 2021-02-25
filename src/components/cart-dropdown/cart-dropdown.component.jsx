import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";

import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

import "./cart-dropdown.styles.scss";

/* 
  Conditionally render a empty message basd off `CartItem` length

  `==`: loose evaluation - check the value and it will coherce the type
  `===`: strict evaluation - check both value and type
  false: 0, false, '', undefined, null, NaN

  In order to go to the checkout page, we need to open the cart dropdown and 
  click the button. Once we get into the page, the dropdown still opens.
  We're displaying the same information to the user.
  Trigger a toggle whenever we click `GO TO CHECKOUT` to toggle the `hidden` state
  (false --> true)

  How we used to do is to write `mapDispatchToProps` and pass in `dispatch` 
  a actionCreator `toggleCartHidden`

  connect actually passes `dispatch` into the component as a prop if we 
  don't supply the second argument to `connect`

  instead of writing another `mapDispathToProps`, bring in `dispatch`
  prop into component
*/

const CartDropdown = ({ cartItems, history, dispatch }) => (
  <div className='cart-dropdown'>
    <div className='cart-items'>
      {cartItems.length ? (
        cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <span className='empty-message'>Your cart is empty</span>
      )}
    </div>
    <CustomButton
      onClick={() => {
        history.push("/checkout");
        dispatch(toggleCartHidden());
      }}>
      GO TO CHECKOUT
    </CustomButton>
  </div>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

/* 
  All higher-order components return components, 
  but also take component as the argument

  Access `history` and the closest `<Route>'s match`
  via the `withRouter` higher-order component.
  It will pass updated `match`, `location`, and `history`
  props to the wrapped component whenever it renders.
*/
export default withRouter(connect(mapStateToProps)(CartDropdown));
