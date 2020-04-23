import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import Create from './Create';
import NotFound from './NotFound';

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/create" exact component={Create} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
}

export default Routes;
