import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { auth } from "../../components/firebase/firebase.utils";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

import { ReactComponent as Logo } from "../../assets/crown.svg";

import "./header.styles.scss";

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
*/

const Header = ({ currentUser, hidden }) => (
  <div className='header'>
    <Link className='logo-container' to='/'>
      <Logo className='logo'></Logo>
    </Link>
    <div className='options'>
      <Link className='option' to='/shop'>
        SHOP
      </Link>
      <Link className='option' to='/contact'>
        CONTACT
      </Link>
      {currentUser ? (
        <div
          className='option'
          onClick={() => {
            auth.signOut();
          }}>
          SIGN OUT
        </div>
      ) : (
        <Link className='option' to='/signin'>
          SIGN IN
        </Link>
      )}
      <CartIcon />
    </div>
    {hidden ? null : <CartDropdown />}
  </div>
);

const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({
  currentUser,
  hidden,
});

export default connect(mapStateToProps)(Header);
