/**
 * Tables Routes
 */
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import EmployeeProfile from "./employeeprofile";
import ClientProfile from "./clientprofile";
import ClientSingleData from "../Pages/clientSingleData";
const subscriptionroute = ({ match }) => (
  <Switch>
    <Redirect
      exact
      from={`${match.url}/`}
      to={`${match.url}/employee-profile`}
    />
    <Route path={`${match.url}/employee-profile`} component={EmployeeProfile} />
    <Route path={`${match.url}/client/:id`} component={ClientSingleData} />
    <Route path={`${match.url}/client-profile`} component={ClientProfile} />
  </Switch>
);

export default subscriptionroute;
