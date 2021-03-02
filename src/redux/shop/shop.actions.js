import ShopActionTypes from "./shop.types";

import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";

/* 
  Thunk is an actionCreator that returns a function to get the
  dispatch very similar to `mapDispatchToProps`

  Thunk == dispatch function (dispatch multiple actions)
*/

// export const updateCollections = (collectionsMap) => ({
//   type: ShopActionTypes.UPDATE_COLLECTIONS,
//   payload: collectionsMap,
// });

// this reducer is used to switch the `isFetching` to true
export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

/* 
  pass into the component to begin the process

  in the `dispatch` function, put the code that fetch
  shop data from firebase 
  
  because of redux-thunk library, redux will instantiate the 
  `fetchCollectionsStart()`, and create the `collectionRef` which
  will switch `isFetching` to true and begins the async request:
  fetch the shop data from backend

  then create `fetchCollectionsSuccess` call to get collectionMap
  once the data comes in, we can dispatch ths success once this 
  asynchronous request resolves

  If redux-thunk middleware is enabled, any time you attempt to 
  dispatch a function instead of an object, the middleware will 
  call that function with dispatch method itself as the first 
  argument.

  redux thunk is a common pattern for redux to handle asynchronous
  event handling when it comes to having components that depend 
  on external API to provide the data
*/

export const fetchCollectionsSuccess = (collectionsMap) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap,
});

export const fetchCollectionsFailure = (errorMessage) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage,
});

export const fetchCollectionsStartAsync = () => {
  return (dispatch) => {
    dispatch(fetchCollectionsStart());
    const collectionRef = firestore.collection(`collections`);
    collectionRef
      .get()
      .then((snapshot) => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        dispatch(fetchCollectionsSuccess(collectionsMap));
      })
      .catch((error) => dispatch(fetchCollectionsFailure(error.message)));
  };
};
