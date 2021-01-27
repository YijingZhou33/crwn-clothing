import React from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Header from "./components/header/header.component";
import { auth } from "./components/firebase/firebase.utils";

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
    this.unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      this.setState({ currentUser: user });
      console.log(user);
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
