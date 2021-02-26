import React from "react";
import { Route } from "react-router-dom";

// import { connect } from "react-redux";
// import { createStructuredSelector } from "reselect";

// import { selectCollections } from "../../redux/shop/shop.selectors";

// import CollectionPreview from "../../components/collection-preview/collection-preview.component";
import CollectionPage from "../collection/collection.component";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";

// import SHOP_DATA from "./shop.data";

/* 
  Keep collection data inside shopPage component
  move this into Redux store because we want the
  same data to build `category` page
  In the hatPage, show all the items
*/
// class ShopPage extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       collections: SHOP_DATA,
//     };
//   }

//   render() {
//     const { collections } = this.state;
//     return (
//       <div className='shop-page'>
//         {collections.map(({ id, ...otherCollectionProps }) => (
//           <CollectionPreview key={id} {...otherCollectionProps} />
//         ))}
//       </div>
//     );
//   }
// }

/* 
  `ShopPage` is becoming a simple non-connected component
  Make a `CollectionsOverview` component (child component) to hold `collections`

  Selectively render inside nested routes
    1. '/shop'
    2. '/shop/:category'

  Inside `App.js` ShopPage is nested in <Route />, which automatically
  passes three objects to the component `match`, `history` and `location`
  as props 

  now match.path == '/shop'
  We don't know where ShopPage is, we only care about the next path `/:category`
  Not setting the path to `/shop` makes it more flexible if we want to reuse
  it in another place.

  `params` object brings the `categoryId` info that was passed into the component.
*/

const ShopPage = ({ match }) => (
  <div className='shop-page'>
    <Route exact path={`${match.path}`} component={CollectionsOverview} />
    <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
  </div>
);

export default ShopPage;

// const mapStateToProps = createStructuredSelector({
//   collections: selectCollections,
// });

// export default connect(mapStateToProps)(ShopPage);
