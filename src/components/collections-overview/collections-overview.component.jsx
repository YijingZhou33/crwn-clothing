import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CollectionPreview from "../../components/collection-preview/collection-preview.component";

import { selectCollectionsForPreview } from "../../redux/shop/shop.selectors";

import "./collections-overview.styles.scss";

/*  
    `CollectionPreview` independently decides what it should
    do with the item once it's passed in. --> filter down to 4

    Alternatively, we can use `selectCollectionsForPreview` to filter
    down to 4 before it is passed in as collecitons array.

    `collectionPreview` is the one in charge of what should be rendered
    write another selector inside `collectionPreivew`, so that instead of
    passing items directly, like `selectCollection`, pass the actual key it needed
    to get the actual array of items. 
*/
const CollectionsOverview = ({ collections }) => (
  <div className='collections-overview'>
    {collections.map(({ id, ...otherCollectionProps }) => (
      <CollectionPreview key={id} {...otherCollectionProps} />
    ))}
  </div>
);

const mapStateToProps = createStructuredSelector({
  collections: selectCollectionsForPreview,
});

export default connect(mapStateToProps)(CollectionsOverview);
