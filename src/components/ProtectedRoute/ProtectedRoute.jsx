import React from 'react';
import PropTypes from 'prop-types';

import { Redirect, Route } from 'react-router-dom';

function ProtectedRoute({ children, isUserAuthed }) {
  return (
    <Route
      render={({ location }) =>
        isUserAuthed ? (
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
  isUserAuthed: PropTypes.bool.isRequired,
};

export default ProtectedRoute;
