import { createSelector } from "reselect";
import memoize from "lodash.memoize";

/* 
  use `match.params.collectionId` to get the collection -- string
  id is number

  collections: [
    {id: 1, items:[], routeName: 'hats', title: 'Hats'}, 
    ...
  ]

  1. map the string value to the respective ID
*/

// const COLLECTION_ID_MAP = {
//   hats: 1,
//   sneakers: 2,
//   jackets: 3,
//   womens: 4,
//   mens: 5,
// };

const selectShop = (state) => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

/* 
  convert object into array
  
  `Object.keys()` will get all the keys and put into an array
  const testObject = {'a': 1, 'b': 2, 'c': 3}
  Object.keys(testObject) // ['a', 'b', 'c']
*/
export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  (collections) => Object.keys(collections).map((key) => collections[key])
);

/* 
  Find `collection.id` matching the url parameter of `COLLECTION_ID_MAP`
  Curry function: a function returns another function
  The function returned is `createSelector`

  `selectCollection` function is not memoized due to 
  `collectionUrlParam` being passed in from collection component's
  `mapStateToProps` running whenever the state changes and calling 
  a new instance of `selectColleciton` function. 

  In this case, `collectionUrlParam` is a dynamic argument, so
  we need to memorize the whole `selectCollection` function.

  Similar to reselect, `Memoize` memorizes the return of `selectCollection`, 
  which is a selector. If this function gets called again with the 
  same `collectionUrlParam`, don't return this function because we've memorized
  , just return the selector
  
  The issue of doing `Array.find()` is that we're passing this function on 
  every element in the array from left to right.
  If we have a collections with thousand items and we're looking for the last one,
  it takes too long to loop through all the elements

  Data normalization: Store lists of elements inside an object (hash table)
  set the key as the `Urlparam` and the key itself should exist inside the 
  item, usually it would be id


*/
export const selectCollection = memoize((collectionUrlParam) =>
  createSelector(
    [selectCollections],
    // (collections) => collections.find(
    //   (collection) => collection.id === COLLECTION_ID_MAP[collectionUrlParam]
    // )
    (collections) => collections[collectionUrlParam]
  )
);
