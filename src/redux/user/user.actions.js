/* 
    implement right actions to app 
    so Redux can store value of user into userReducer 

    create action (action.type & action.payload) to triggle the correct case
    inside switch statement and set currentUser inside userReducer as payload object 
    return objects 

    user: userAuth in App.js

*/

export const setCurrentUser = (user) => ({
  type: "SET_CURRENT_USER",
  payload: user,
});
