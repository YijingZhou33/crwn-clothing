import React from "react";

import { SpinnerOverlay, SpinnerContainer } from "./with-spinner.styles";

/* 
  higher order component returns a functional component `Spinner`
  `isLoading` - boolean
    true: render Spinnercomponent
    false: render `WrappedComponent` with props except isLoading
*/
const withSpinner = (WrappedComponent) => {
  const Spinner = ({ isLoading, ...otherProps }) => {
    return isLoading ? (
      <SpinnerOverlay>
        <SpinnerContainer />
      </SpinnerOverlay>
    ) : (
      <WrappedComponent {...otherProps} />
    );
  };
  return Spinner;
};

export default withSpinner;
