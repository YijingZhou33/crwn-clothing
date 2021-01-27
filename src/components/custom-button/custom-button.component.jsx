import React from "react";

import "./custom-button.styles.scss";

/* 
    Both <button> and <input> have property: type="submit" and submit the form.
    It will trigger the "onSubmit" method once click on the button/input[submi]

    children is for button text
*/
const CustomButton = ({ children, isGoogleSignIn, ...otherProps }) => (
  <button
    className={`${isGoogleSignIn ? "google-sign" : ""} custom-button`}
    {...otherProps}>
    {children}
  </button>
);

export default CustomButton;
