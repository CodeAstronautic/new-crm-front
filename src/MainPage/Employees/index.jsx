/**
 * Crm Routes
 */
/* eslint-disable */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Clients from './clients';
import ClientsList from './clientslist';
import Leades from './leades';
import Tickets from './tickets';
import TicketView from './ticketview';
import AFPR from './afpr';
import UsersList from "./usersList"
import ClientSingleData from '../Pages/Pages/clientSingleData';

const EmployeeRoute = ({ match }) => (
   <Switch>
      {console.log(match)}
      <Redirect exact from={`${match.url}/`} to={`${match.url}/clients`} />
      <Route path={`${match.url}/clients`} component={Clients} />
      <Route path={`${match.url}/clients-list`} component={ClientsList} />
      <Route path={`${match.url}/users-list`} component={UsersList} />
      <Route path={`${match.url}/leads`} component={Leades} />
      <Route path={`${match.url}/tickets`} component={Tickets} />
      <Route path={`${match.url}/ticket-view`} component={TicketView} />
      <Route path={`${match.url}/afpr`} component={AFPR} />
      <Route exact path={`${match.url}/client/:id`} component={ClientSingleData} />
   </Switch>
);

export default EmployeeRoute;
