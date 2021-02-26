import React from "react";
import StripeCheckout from "react-stripe-checkout";

/* 
  Stripe wants the price in cents
  `token` is the success callback when we trigger the submission
  with `token` it can be passed into the backend and create the charge
*/
const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishablekey =
    "pk_test_51IPEoTK9mdhXwDoQvt2iTYsMqkWMMYAeg3sNUCIaz6UuJf1ffZkO8RWvvTaJOHwVJBcmtnhpyvKYHqphQkY692VN00xux3z5hY";
  const onToken = (token) => {
    console.log(token);
    alert("Payment Successful!");
  };
  return (
    <StripeCheckout
      label='Pay Now'
      name='CRWN Clothing Ltd.'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishablekey}
    />
  );
};

export default StripeCheckoutButton;
