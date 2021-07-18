import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Home } from "./components/home/home";
import { LogIn } from "./components/log-in/log-in";
import { Profile } from "./components/profile/profile";
import { SignIn } from './components/sign-in/sign-in';

const Routes = (props) => (

    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/Home" component={Home} />
      <Route path="/Profile" >
        {props.isLoggedIn? <Profile {...props} /> : <Redirect to='/LogIn'/> }
      </Route>
      <Route path="/LogIn" >
        {props.isLoggedIn? <Redirect to='/'/> : <LogIn  isLoggedIn={props.isLoggedIn} globalLogin={props.globalLogin} />}
      </Route>
      <Route path="/SignIn" >
        {props.isLoggedIn? <Redirect to='/'/> : <SignIn />}
      </Route>
    </Switch>
);

export default Routes;