import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

// import { connect } from "react-redux";
// import { createStructuredSelector } from "reselect";

// import { selectCollections } from "../../redux/shop/shop.selectors";

// import CollectionPreview from "../../components/collection-preview/collection-preview.component";
import CollectionPage from "../collection/collection.component";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import withSpinner from "../../components/with-spinner/with-spinner.component";

import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";

import { updateCollections } from "../../redux/shop/shop.actions";

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

/* 
  Pull `collections` Collection data on the Firestore and store
  in the Redux

  1. Does the data represent everything needed in order to 
    utilize it best for the application?

    Remove `routeName` prop when importing it into firestore
    It's only relevant to the front-end. (web application only)
    Irrelevant to mobile application

    Add `routeName` prop back onto the data 
  
  2. Where should we put code to fetch the data in Redux?
    `Shop component`

    Put the code in the nearest ancestor node to only write 
    the fetching data one time. 

    When we render the appropriate children we want either have
    that data loaded or in the process of being fetched. 

    The way React renders its component is to mount all of the parent
    components as well. 


    `componentDidMount()` lifecycle method to perform the actual fetch
    very similar to `App.js` to fetch authenticated user
    
    1. convert funciona component into class component
    2. subscribe to some reference & unsubscribe from it whenever we 
      unmount the component

        An open messaging system between the app and Firebase
        Whenever any changes occur on Firebase, 
        it will send out the message that status has changed 

      Also needs to close it on unmount in case of memory leaks

        snapshot is the `collections` array on the firestore

        `onSnapshot()` whenever the collectionRef updates or it runs
        for the first time, it will send the snapshot representing the 
        `collections` snapshot object with `doc` array. 

        Also add `routeName` into `doc` array
    3. store `collectionMap` into shop Reducer
        create new action type and creator: `UPDATE_COLLECTIONS`

*/

// const ShopPage = ({ match }) => (
//   <div className='shop-page'>
//     <Route exact path={`${match.path}`} component={CollectionsOverview} />
//     <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
//   </div>
// );

/* 
  set `isLoading` to boolean
  where to use `withSpinner` component?
    it takes a component as an argument and returns `WrappedComponent` 
    when the loading is false.

    `CollectionsOverview` & `CollectionPage` need to know whether
    it is loading. 

    render the component inside <Route> and pass the loading prop in 
    the state 
    use `render` func which has access to all the route props and it
    gives access to `collection` component with `match` inside the 
    selector to pull off proper collection. 


*/

const CollectionsOverviewWithSpinner = withSpinner(CollectionsOverview);
const CollectionPageWithSpinner = withSpinner(CollectionPage);

/* 
  -------------------- Promise Pattern --------------------
    1. firstore.collection + return promises 
      `collectionRef.get()`: make an API call to fetch back the 
      data associated to the collection
        similar to what `onSnapshot()` has got from the backend 

      .then(): pass in snapshot transformation 

      The only time we'll get the new data from the firebase is when 
      we remount the shop component because we're no longer leveraging
      the live updates style that the observer pattern use with `onSnapshot`
    
    2. native fetch
      use firebase as API - accessible by URL 

  -------------------- Redux Asynchronous Event Handling --------------------
    Now we're handling the asynchronous natural of fetching data inside
    the `ShopPage` component: get the data and update the informtion.
    
    Have this code inside a Redux action that will handle all of the 
    asynchronous nature and then fire the event.

    Why do we want to move the logic out of `componentDidMount`?
      There's a chance that we need to fetch data from the backend, store it in 
      a reducer somewhere else in the application. 

      For example, if we never go to `/shop` page, the collections is null. 
      The action only gets fired when shop component mounts for the first time. 
      
      We don't need to rewrite the code in another component 
      Also don't want to move it to top-level App component because we're rendering 
      too much data once the initial application mounts.

    Move it into an asynchronous redux action
*/

class ShopPage extends React.Component {
  state = {
    loading: true,
  };

  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection(`collections`);
    // 1. Observer pattern
    /*     this.unsubscribeFromSnapshot = collectionRef.onSnapshot((snapshot) => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      // store it into Redux state
      updateCollections(collectionsMap);
      this.setState({ loading: false });
    }); */

    // 2. Promise pattern
    collectionRef.get().then((snapshot) => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      updateCollections(collectionsMap);
      this.setState({ loading: false });
    });

    // 3. Fetch pattern - really nested objects
    /*     fetch(
      "https://firestore.googleapis.com/v1/projects/crwn-db-d206a/databases/(default)/documents/collections"
    )
      .then((response) => response.json())
      .then((collections) => console.log(collections)); */
  }

  render() {
    const { match } = this.props;
    const { loading } = this.state;
    return (
      <div className='shop-page'>
        <Route
          exact
          path={`${match.path}`}
          render={(props) => (
            <CollectionsOverviewWithSpinner isLoading={loading} {...props} />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={(props) => (
            <CollectionPageWithSpinner isLoading={loading} {...props} />
          )}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateCollections: (collectionsMap) =>
    dispatch(updateCollections(collectionsMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);

// const mapStateToProps = createStructuredSelector({
//   collections: selectCollections,
// });

// export default connect(mapStateToProps)(ShopPage);
