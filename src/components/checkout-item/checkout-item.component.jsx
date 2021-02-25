import React from "react";

import "./checkout-item.styles.scss";

/* 
  pass the whole cartItem instead of spreading
  all the props because we want to increase
  or decrease the quantity
*/
const CheckoutItem = ({ cartItem: { name, imageUrl, quantity, price } }) => (
  <div className='checkout-item'>
    <div className='image-container'>
      <img src={imageUrl} alt='item' />
    </div>
    <span className='name'>{name}</span>
    <span className='quantity'>{quantity}</span>
    <span className='price'>{price}</span>
    <div className='remove-button'>&#10005;</div>
  </div>
);

export default CheckoutItem;
