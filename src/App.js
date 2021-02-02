import React from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Header from "./components/header/header.component";
import {
  auth,
  createUserProfileDocument,
} from "./components/firebase/firebase.utils";

/* 
    Parameters of Route component:
      1. exact - {true / false} - true: exactly the path 
      2. path - sub url from current page (https://localhost:3000)
      3. component - render 

    Switch
      <Route> inside find a match, it only renders the exact route. [exclusively]

    Only have access to first component passed to Route - HomePage
      S1: pass the "history" props deep down to the component 
          Bad solution! prop drilling / prop tunnelling 
          Children in between don't actually need the "history" property
          other than pass it to their children.
      
          S2: {withRouter} - higher order component 
          Function: take a component as an argument and return a modified component
          e.g. MenuItem is a function which takes props to render component 
          
          power up component with props: location, match and history

      Place <Header /> outside of <Switch>
      Header will always present

    Firebase Auth - persistent session
      Normally how to fetch the data inside of the App is to fire a fetch 
      to the backend inside componentDidMount()
      
      Once the code calls fetch, it won't call fetch again 
      until a ComponentDidMount() gets called again. 

      Just want Firebase to realize the authentication state has changed
        auth is an observer gets called whenever the user's sign-in state changes
        auth.onAuthStateChanged() will give information about the sign-in user

    Open subscription system
      An open messaging system between the app and Firebase
      Whenever any changes occur on Firebase, 
      it will send out the message that Auth status has changed 

      Also needs to close it on unmount in case of memory leaks

    How to store authenticated user into database?
      make async call to make API request to get back from Auth library

      Useful properties of userAuth object:
        1. displayName
        2. email
        3. uid - dynamically generated ID string 

      Put userAuth properties into users collection inside database
    
    Also store the data in the "state" of the application to be used
      use userAuth to check if the database has updated   
      
      userRef.onSnapshot()
      It will send a snapshot object representing the data that is currently 
      stored in the database.

      If a user signs in we'll check if they're actually signed in with `userAuth`
        If there is we will get back userRef from `createUserProfileDocument` method
          If there is a document we will get back the userRef
          If there is no document we will create a new document and still get back the userRef
        
        Then listen to userRef for any changes to data
        But will also get back the first state of data
        use data to `setState`
      
      If user signed out, set currentUser to Null.

    setState is asynchronous
      We pass a second function as a parameter in setState 
*/

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapShot) => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            },
          });
        });
      } else {
        this.setState({ currentUser: userAuth });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/shop' component={ShopPage} />
          <Route exact path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
