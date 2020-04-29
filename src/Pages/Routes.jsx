import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import ProtectedRoute from '../components/ProtectedRoute';
import Home from './Home';
import Login from './Login';
import Create from './Create';
import UserProfile from './UserProfile';
import NotFound from './NotFound';

function Routes({ isUserAuthenticated, user }) {
  console.log('REOUTES isUserAuthenticated: ', isUserAuthenticated);
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/create" exact component={Create} />
      <ProtectedRoute
        path="/user/:id"
        exact
        isUserAuthenticated={isUserAuthenticated}
        component={() => <UserProfile user={user} />}
      />
      <Route path="*" component={NotFound} />
    </Switch>
  );
}

Routes.propTypes = {
  isUserAuthenticated: PropTypes.bool.isRequired,
};

export default Routes;
