import ShopActionTypes from "./shop.types";

/* 
  `isFetching`: whether or not we're fetching 
    the data for collections prop 
  `errorMessage`: store the error message

  Prior we had `loading` value inisde shoppage
  because the component was doing the API call

  Move it into Redux so the reducer needs to add the state
  to indicate whether the data is fetching related to the 
  shop reducer. 
*/
const INITIAL_STATE = {
  collections: null,
  isFetching: false,
  errorMessage: undefined,
};

/* 
  Reducer listen for the back-end updates to store the 
  actual collections value, we don't need INITIAL_STATE
  and SHOP_DATA from the front-end. 

  Once we've deleted SHOP_DATA and set INITIAL_STATE to null,
  there're couple of issues:
    1. selector `selectCollectionForPreview` is expecting 
      an object exists because we can't convert null
      if object doesn't exist, return an empty array
    2. in the collection page, when we refresh the page, 
    selector `selectCollection` fails:
      inside this selector, we pass in `collectionUrlParam` and
      use collectionsMap object to find the corresponding collection
      object
      pass it to `collection.component`

    3. What to do if collection object is null?
      - in the selector return null
      - in the component, we're getting `title` and `items` from null.
        Now the app is in the state where a collection could possibly 
        be null because when the app first boots up and the collection 
        page mounts, it will try to find a collection map inside the state, 
        because we haven't received the data from back-end (asynchronous: it
        takes time to come back to us with a response)

        create a loading state - write a spinner
        `shop` component is the one that will be able to know whether or not
        the loading state is finished because `shop` component actually receives
        and makes the call to reducer after getting the data from firestore. 
*/

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ShopActionTypes.FETCH_COLLECTIONS_START:
      return {
        ...state,
        isFetching: true,
      };
    case ShopActionTypes.FETCH_COLLECTIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        collections: action.payload,
      };
    case ShopActionTypes.FETCH_COLLECTIONS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    // case ShopActionTypes.UPDATE_COLLECTIONS:
    //   return {
    //     ...state,
    //     collections: action.payload,
    //   };
    default:
      return state;
  }
};

export default shopReducer;
