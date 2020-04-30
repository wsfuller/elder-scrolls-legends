import React, { useContext } from 'react';
// import PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';

import ProtectedRoute from '../components/ProtectedRoute';
import Home from './Home';
import Login from './Login';
import CreateUser from './CreateUser';
import UserProfile from './UserProfile';
import NotFound from './NotFound';

import { UserContext } from '../Context/UserContext';

function Routes() {
  const [user] = useContext(UserContext);

  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route
        path="/create"
        exact
        component={() =>
          user.isAuthed ? <Redirect to={{ pathname: `/user/${user.id}` }} /> : <CreateUser />
        }
      />
      <ProtectedRoute path={`/user/${user.id}`} isUserAuthed={user.isAuthed}>
        <UserProfile user={user} />
      </ProtectedRoute>
      <Route path="*" component={NotFound} />
    </Switch>
  );
}

// Routes.propTypes = {
//   user: PropTypes.shape({
//     id: PropTypes.string,
//     isAuthed: PropTypes.bool,
//   }).isRequired,
// };

export default Routes;
