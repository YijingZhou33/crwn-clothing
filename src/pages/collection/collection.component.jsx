import React from "react";
import { connect } from "react-redux";

import CollectionItem from "../../components/collection-item/collection-item.component";

import { selectCollection } from "../../redux/shop/shop.selectors";

import "./collection.styles.scss";

const CollectionPage = ({ collection }) => {
  const { title, items } = collection;
  return (
    <div className='collection-page'>
      <h2 className='title'>{title}</h2>
      <div className='items'>
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

/* 
  The first prop: overall state from the top 
  The second prop: own props of the component wrapped
  in the `connect`
  
  `selectCollection(ownProps.match.params.collectionId)`
  returns `createSelector()` call and take the `state` as
  parameter and runs through the selection flow. 
  This selector needs a part of the state depending on the 
  URL parameter
*/
const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state),
});

export default connect(mapStateToProps)(CollectionPage);
