import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(() => ({
  loader: {
    display: 'flex',
    justifyContent: 'center',
    padding: '1rem',
  },
}));

function Loading() {
  const classes = useStyles();

  return (
    <div className={classes.loader}>
      <CircularProgress size={80} thickness={4} />
    </div>
  );
}

export default Loading;
