import React from "react";
import { connect } from "react-redux";

import CustomButton from "../custom-button/custom-button.component";
import { addItem } from "../../redux/cart/cart.actions";

import "./collection-item.styles.scss";

/* 
  Because we need to access the item the `CollectionItem`
  represents to dispatch it into `addItem` function

    1. Where we use `collection-item` - `collection-preview`
    2. Access the item used in `addItem`

  `addItem()` allows us to add items into the same array
   anywhere in any component inside the app 
*/

const CollectionItem = ({ item, addItem }) => {
  const { name, price, imageUrl } = item;
  return (
    <div className='collection-item'>
      <div className='image' style={{ backgroundImage: `url(${imageUrl})` }} />
      <div className='collection-footer'>
        <span className='name'>{name}</span>
        <span className='price'>{`$${price}`}</span>
      </div>
      <CustomButton onClick={() => addItem(item)} inverted>
        Add to cart
      </CustomButton>
    </div>
  );
};

/* 
  `mapDispatchToProps` provides action dispatching function 
  `addItem` as a prop and go inside `CollectionItem` component
  So the component no longer receive `dispatch`

  Whenever dispatch or call `addItem` function, it will receive
  `item` as a prop, passing into `addItem` action creator, 
  return an action object with `payload == item`
  then dispatch the new object into store 

  Now we have access to `addItem` function as a prop 
  destructure it inside the component
*/
const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(CollectionItem);
