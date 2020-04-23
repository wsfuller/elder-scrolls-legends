import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';

function UserActions({ user: { username }, isUserAuthenticated }) {
  if (isUserAuthenticated) {
    return <Button color="inherit">{`User Name here ${username}`}</Button>;
  }
  return (
    <Button color="inherit" href="/login">
      Login
    </Button>
  );
}

UserActions.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
  }).isRequired,
  isUserAuthenticated: PropTypes.bool.isRequired,
};

export default UserActions;
