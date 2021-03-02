import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { selectCollectionsLoaded } from "../../redux/shop/shop.selectors";
import withSpinner from "../../components/with-spinner/with-spinner.component";
import CollectionPage from "../collection/collection.component";

/* 
  We need to post-process the return of the function 
  `selectCollectionsLoaded`: function reference --> can't invert function
  `selectCollectionsLoaded(state)`: return boolean
*/

const mapStateToProps = createStructuredSelector({
  isLoading: (state) => !selectCollectionsLoaded(state),
});

const CollectionPageContainer = compose(
  connect(mapStateToProps),
  withSpinner
)(CollectionPage);

export default CollectionPageContainer;
