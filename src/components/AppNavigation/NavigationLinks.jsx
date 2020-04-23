import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InfoIcon from '@material-ui/icons/Info';
import GitHubIcon from '@material-ui/icons/GitHub';
import StorageIcon from '@material-ui/icons/Storage';
import BrushIcon from '@material-ui/icons/Brush';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: '100%',
    minWidth: 250,
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.5rem 1rem',
  },
}));

const linkList = [
  {
    text: 'GitHub Repo',
    href: 'https://github.com/wsfuller/elder-scrolls-legends',
    icon: <GitHubIcon />,
  },
  {
    text: 'ESL API Docs',
    href: 'https://docs.elderscrollslegends.io/',
    icon: <StorageIcon />,
  },
  {
    text: 'WSF Portfolio',
    href: 'https://wsfuller.dev',
    icon: <BrushIcon />,
  },
];

function NavigationLinks({ openDialog }) {
  const classes = useStyles();

  return (
    <div className={classes.drawer}>
      <div className={classes.title}>
        <Link href="/" variant="h6" className={classes.title} color="inherit" underline="none">
          Elder Scrolls Legends
        </Link>
      </div>
      <Divider />
      <List component="nav">
        <ListItem button onClick={() => openDialog()}>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary="About Project" />
        </ListItem>
        {linkList.map((item) => (
          <ListItem key={item.text} button component="a" href={item.href}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

NavigationLinks.propTypes = {
  openDialog: PropTypes.func.isRequired,
};

export default NavigationLinks;
