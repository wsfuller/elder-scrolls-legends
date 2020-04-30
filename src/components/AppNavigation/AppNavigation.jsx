import React, { Fragment, useContext, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import NavigationLinks from './NavigationLinks';
import UserActions from './UserActions';
import { UserContext } from '../../Context/UserContext';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function AppNavigation() {
  const classes = useStyles();
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [user] = useContext(UserContext);

  console.log('user in AppNavigation: ', user);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <Fragment>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => setIsNavDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Link href="/" variant="h6" className={classes.title} color="inherit" underline="none">
            Elder Scrolls Legends
          </Link>
          <UserActions user={user} />
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={isNavDrawerOpen} onClose={() => setIsNavDrawerOpen(false)}>
        <NavigationLinks openDialog={handleOpenDialog} />
      </Drawer>
      <Dialog onClose={handleCloseDialog} aria-labelledby="simple-dialog-title" open={isDialogOpen}>
        <DialogTitle>About the Project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            The goal of this project is to build a visually appealing, modern responsive front end
            application. The application connects into the Elder Scrolls Legends API for data
            retrieval. Users are then able to infinitely scroll through the card data and fuzzy
            search by card names.
            <br />
            <br />
            This application was built with React using Create React App. State management and data
            retrieval with React Hooks. The user interface is built with the React Material UI
            framework and deployed on Netlify.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default AppNavigation;
