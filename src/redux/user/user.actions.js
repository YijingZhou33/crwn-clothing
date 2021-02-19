/* 
    Action creator - function
    implement right actions to app 
    so Redux can store value of user into userReducer 

    create action (action.type & action.payload) to triggle the correct case
    inside switch statement and set currentUser inside userReducer as payload object 
    return objects 

    name type string like this: `domain/eventName`

    user: userAuth in App.js

*/

import UserActionTypes from "./user.types";

// action creator
export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});
