/* 
  Two-levels of wrapping inside the container component

  `compose`: currying functions together - evaluate from right to left
*/

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { selectIsCollectionFetching } from "../../redux/shop/shop.selectors";
import withSpinner from "../with-spinner/with-spinner.component";
import CollectionsOverview from "../collections-overview/collections-overview.component";

/* 
  pass `isLoading` into `withSpinner` HOC wrapping the `CollectionsOverview`
  make sure pass the right prop name `withSpinner` is expecting
*/
const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching,
});

// const collectionsOverviewContainer = connect(mapStateToProps)(
//   withSpinner(CollectionsOverview)
// );

const CollectionsOverviewContainer = compose(
  connect(mapStateToProps),
  withSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;
