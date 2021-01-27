import React from "react";

import "./form-input.styles.scss";

/* 
    handleChange - bubble up any change the input has 

    label props - selectively render the label
      If a label is generated, it will always have the className 'form-input-label'.
      But 'shrink' property depends on whether the user types 
*/

const FormInput = ({ handleChange, label, ...otherFormProps }) => (
  <div className='group'>
    <input className='form-input' onChange={handleChange} {...otherFormProps} />
    {label ? (
      <label
        className={`${
          otherFormProps.value.length ? "shrink" : ""
        } form-input-label`}>
        {label}
      </label>
    ) : null}
  </div>
);

export default FormInput;
