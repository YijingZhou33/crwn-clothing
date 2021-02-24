/* 
  first parameter: the existing cartItems
  second parameter: item needs to be added

  Look inside the existing items to see if it exists 
  
  array.find() will return the first elemnt found based off the
  condition passed in, return True or undefined

  array.map() will return a new array
*/
export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};
