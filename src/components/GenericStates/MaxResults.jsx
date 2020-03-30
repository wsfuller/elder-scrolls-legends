import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  maxResults: {
    display: 'flex',
    maxWidth: 500,
    margin: `${theme.spacing(8)}px auto`,
    textAlign: 'center',
    fontStyle: 'italic',
  },
}));

function MaxResults({ message }) {
  const classes = useStyles();

  return (
    <Typography variant="h5" className={classes.maxResults}>
      {message}
    </Typography>
  );
}

MaxResults.propTypes = {
  message: PropTypes.string,
};

MaxResults.defaultProps = {
  message: 'You have reached the max number of results',
};

export default MaxResults;
