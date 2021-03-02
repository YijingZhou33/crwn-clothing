/* 
  FETCH_COLLECTIONS_START: 
    the first API call when the app begins
  FETCH_COLLECTIONS_SUCCESS:
    successful API request with data 
  FETCH_COLLECTIONS_FAILURE:
    server is down or connection is poor 
*/
const ShopActionTypes = {
  // UPDATE_COLLECTIONS: "UPDATE_COLLECTIONS",
  FETCH_COLLECTIONS_START: "FETCH_COLLECTIONS_START",
  FETCH_COLLECTIONS_SUCCESS: "FETCH_COLLECTIONS_SUCCESS",
  FETCH_COLLECTIONS_FAILURE: "FETCH_COLLECTIONS_FAILURE",
};

export default ShopActionTypes;
