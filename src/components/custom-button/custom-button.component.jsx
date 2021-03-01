import React from "react";

// import "./custom-button.styles.scss";
import { CustomButtonContainer } from "./custom-button.styles";

/* 
    Both <button> and <input> have property: type="submit" and submit the form.
    It will trigger the "onSubmit" method once click on the button/input[submi]

    Invert the color of the button based on properties: 
      `isGoogleSignIn`, `inverted`
    children is for button text
*/
// const CustomButton = ({
//   children,
//   isGoogleSignIn,
//   inverted,
//   ...otherProps
// }) => (
//   <button
//     className={`${inverted ? "inverted" : ""} ${
//       isGoogleSignIn ? "google-sign" : ""
//     } custom-button`}
//     {...otherProps}>
//     {children}
//   </button>
// );

const CustomButton = ({ children, ...otherProps }) => (
  <CustomButtonContainer {...otherProps}>{children}</CustomButtonContainer>
);

export default CustomButton;
