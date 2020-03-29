import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  noResults: {
    display: 'flex',
    maxWidth: 500,
    margin: 'auto',
    textAlign: 'center',
  },
}));

function NoResults({ message }) {
  const classes = useStyles();

  return (
    <Typography variant="h4" className={classes.noResults}>
      {message}
    </Typography>
  );
}

NoResults.propTypes = {
  message: PropTypes.string,
};

NoResults.defaultProps = {
  message: "Sorry but we couldn't find what you were looking for",
};

export default NoResults;
