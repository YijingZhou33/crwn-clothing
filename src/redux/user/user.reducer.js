/* 
    Store the state of current users
    Reducer is a function with two props - similar to event listener
      1. `state` object - current state
      2. `action` object
        {
          type: string value represents what the specific action it is 
          payload: 
        }
      3. switch 

    when we fire the state for the first time, there's nothing --> set an initial state 
    INITIAL_STATE is similar to `this.state` in Class Component 
    default parameter value - ES6 
      parameter `state` is undefined 
      null is considered as a value, it will pass null as state value 

    every single Reducer get every single state gets fired 
    even if actions are not related to this reducer 
    if none of action.type mateches the switch statement, return state 

    if action.type == 'SET_CURRENT_USER', return a new state object 
        spread everything in the state object
        modify the value we care about - action.payload

    bring this into root reducer
*/

import UserActionTypes from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  // Check to see if the reducer cares about this action
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      // If so, make a copy of `state`
      return {
        ...state,
        // Update the copy
        currentUser: action.payload,
      };
    default:
      // Otherwise return the existing state unchanged
      return state;
  }
};

export default userReducer;
