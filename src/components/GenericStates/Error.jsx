import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import WarningIcon from '@material-ui/icons/Warning';

const useStyles = makeStyles((theme) => ({
  error: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  errorIcon: {
    color: 'red',
    fontSize: '5rem',
    marginBottom: theme.spacing(2),
  },
  errorMessage: {
    maxWidth: 500,
    textAlign: 'center',
  },
}));

function Error({ message }) {
  const classes = useStyles();

  return (
    <div className={classes.error}>
      <WarningIcon className={classes.errorIcon} />
      <Typography variant="h4" className={classes.errorMessage}>
        {message}
      </Typography>
    </div>
  );
}

Error.propTypes = {
  message: PropTypes.string,
};

Error.defaultProps = {
  message: "We're sorry but it looks like something went wrong",
};

export default Error;
