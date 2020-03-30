import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useStyles = makeStyles((theme) => ({
  backToTop: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    position: 'fixed',
    bottom: 15,
    right: 15,
    width: 50,
    height: 50,
    padding: theme.spacing(1),
    color: theme.palette.primary.contrastText,
    textAlign: 'center',
    backgroundColor: theme.palette.primary.dark,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[5],
    zIndex: theme.zIndex.mobileStepper,
    transition: `all ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: theme.palette.primary.main,
      boxShadow: theme.shadows[10],
    },
  },
  backToTopIcon: {
    margin: 'auto',
  },
  backToTopText: {
    lineHeight: 'normal',
  },
}));

function BackToTop() {
  const classes = useStyles();

  const scrollToTopOfPage = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div
      role="button"
      tabIndex="0"
      className={classes.backToTop}
      onClick={() => scrollToTopOfPage()}
      onKeyPress={() => scrollToTopOfPage()}
    >
      <KeyboardArrowUpIcon className={classes.backToTopIcon} />
      <Typography variant="overline" display="block" className={classes.backToTopText}>
        top
      </Typography>
    </div>
  );
}

export default BackToTop;
