import React from 'react';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

function CardDetails({ cardDetails, isCardDetailsOpen, closeCardDetails }) {
  const { name, rarity, unique, type, collectible, attributes } = cardDetails;

  return (
    <Dialog fullWidth maxWidth="md" open={isCardDetailsOpen} onClose={() => closeCardDetails()}>
      <DialogTitle>{name}</DialogTitle>
      <DialogContent>
        <List
          // className={classes.detailList}
          subheader={<ListSubheader>Card Details</ListSubheader>}
        >
          <ListItem dense>
            <ListItemText primary="Rarity:" secondary={rarity} />
          </ListItem>
          <ListItem dense>
            <ListItemText primary="Type:" secondary={type} />
          </ListItem>
          <ListItem dense>
            <ListItemText primary="Unique:" secondary={unique ? 'Yes' : 'No'} />
          </ListItem>
          <ListItem dense>
            <ListItemText primary="Collectible:" secondary={collectible ? 'Yes' : 'No'} />
          </ListItem>
          <ListItem dense>
            <ListItemText primary="Attributes:" secondary={attributes.join(', ')} />
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => closeCardDetails()} color="primary" autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

CardDetails.propTypes = {
  cardDetails: PropTypes.shape({
    name: PropTypes.string,
    rarity: PropTypes.string,
    unique: PropTypes.bool,
    type: PropTypes.string,
    collectible: PropTypes.bool,
    attributes: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  isCardDetailsOpen: PropTypes.bool.isRequired,
  closeCardDetails: PropTypes.func.isRequired,
};

export default CardDetails;
