import React from "react";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { auth } from "../../firebase/firebase.utils";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";

import { ReactComponent as Logo } from "../../assets/crown.svg";

// import "./header.styles.scss";
import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink,
} from "./header.styles";

/* 
    SVG - Scalable vactor graphics

    bring userReducer as currentUser into Header Component which gets currentUser from App.js
    Header Component needs to pull currentUser from userReducer 

    connect is a higher-order component which meodifies component related to Redux
    
    higher-order component is a component that takes components as arguments and 
    return a souped up component 
      first function (mapStateToProps) - access the state of rootReducer --> the currentUser value
      second function - component 
      get null as currentUser and being passed in -- sign out

      mapStateToProps will be used anythere we need the property of the state


    styled-component:
      If the only difference between style components is what type of base element (Link or div) it
      needs to return, instead of using CSS block, add `as='div' or as={component}`
*/

const Header = ({ currentUser, hidden }) => (
  <HeaderContainer>
    <LogoContainer to='/'>
      <Logo className='logo'></Logo>
    </LogoContainer>
    <OptionsContainer>
      <OptionLink to='/shop'>SHOP</OptionLink>
      <OptionLink to='/contact'>CONTACT</OptionLink>
      {currentUser ? (
        <OptionLink
          as='div'
          onClick={() => {
            auth.signOut();
          }}>
          SIGN OUT
        </OptionLink>
      ) : (
        <OptionLink to='/signin'>SIGN IN</OptionLink>
      )}
      <CartIcon />
    </OptionsContainer>
    {hidden ? null : <CartDropdown />}
  </HeaderContainer>
);

// const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({
//   currentUser,
//   hidden,
// });

// const mapStateToProps = (state) => ({
//   currentUser: selectCurrentUser(state),
//   hidden: selectCartHidden(state),
// });

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});

export default connect(mapStateToProps)(Header);
