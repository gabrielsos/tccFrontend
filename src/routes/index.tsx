import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import Profile from '../pages/Profile';
import OsRegisters from '../pages/Registers';
import NewOs from '../pages/NewOs';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/profile" exact component={Profile} isPrivate />
    <Route path="/profile/os/new" exact component={NewOs} isPrivate />
    <Route path="/profile/os/:id" exact component={OsRegisters} isPrivate />
  </Switch>
);

export default Routes;
