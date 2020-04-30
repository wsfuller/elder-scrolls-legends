import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';

function UserActions({ user: { id, username, isAuthed } }) {
  if (isAuthed) {
    return <Button color="inherit" href={`/user/${id}`}>{`Welcome, ${username}`}</Button>;
  }
  return (
    <Button color="inherit" href="/login">
      Login
    </Button>
  );
}

UserActions.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    username: PropTypes.string,
    isAuthed: PropTypes.bool,
  }).isRequired,
};

export default UserActions;
