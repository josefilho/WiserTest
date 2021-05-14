import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path='/' component={SignIn} />
    <Route path='/signup' component={SignUp} />
    <Route path='/home' component={Home} />

    <Route path='*' component={SignIn} />
  </Switch>
);

export default Routes;
