import React, { Fragment, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';

import NavigationLinks from './NavigationLinks';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function AppNavigation() {
  const classes = useStyles();
  const [navDrawer, toggleNavDrawer] = useState(false);

  return (
    <Fragment>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => toggleNavDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Elder Scrolls Legends
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={navDrawer} onClose={() => toggleNavDrawer(false)}>
        <NavigationLinks />
      </Drawer>
    </Fragment>
  );
}

export default AppNavigation;
