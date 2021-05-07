import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path='/' component={Home} />
    <Route path='/dashboard' component={Dashboard} />
  </Switch>
);

export default Routes;
