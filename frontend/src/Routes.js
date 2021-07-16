import React from "react";
import { Switch, Route } from "react-router-dom";
import { LogIn } from "./components/log-in/log-in";
import { SignIn } from './components/sign-in/sign-in';

const Routes = () => (
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route path="/LogIn" component={LogIn} />
      <Route path="/SignIn" component={SignIn} />
    </Switch>
);

export default Routes;