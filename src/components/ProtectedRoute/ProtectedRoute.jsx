import React from 'react';
import PropTypes from 'prop-types';

import { Redirect, Route } from 'react-router-dom';

function ProtectedRoute({ children, isUserAuthenticated }) {
  return (
    <Route
      render={({ location }) =>
        isUserAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  isUserAuthenticated: PropTypes.bool.isRequired,
};

export default ProtectedRoute;
