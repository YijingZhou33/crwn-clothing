import React from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";

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
*/

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/shop' component={ShopPage} />
      </Switch>
    </div>
  );
}

export default App;
