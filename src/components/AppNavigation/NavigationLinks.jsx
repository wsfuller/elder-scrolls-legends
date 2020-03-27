import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InfoIcon from '@material-ui/icons/Info';
import GitHubIcon from '@material-ui/icons/GitHub';

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
    padding: '1.5rem 1rem',
  },
}));

const linkList = [
  {
    text: 'About Project',
    href: '',
    icon: <InfoIcon />,
  },
  {
    text: 'GitHub Repo',
    href: 'https://github.com/wsfuller/elder-scrolls-legends',
    icon: <GitHubIcon />,
  },
];

// function ListItemLink(props) {
//   return <ListItem button component="a" {...props} />;
// }

function NavigationLinks() {
  const classes = useStyles();

  return (
    <div className={classes.drawer}>
      <div className={classes.title}>
        <Typography variant="h6">Elder Scrolls Legends</Typography>
      </div>
      <Divider />
      <List component="nav" aria-label="main mailbox folders">
        {linkList.map((item) => (
          <ListItem key={item.text} button>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default NavigationLinks;
