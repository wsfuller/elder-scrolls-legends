import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  feedWrapper: {
    width: '100%',
    flexGrow: 1,
    padding: `0 ${theme.spacing(3)}px`,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    padding: theme.spacing(3),
  },
  cardImage: {
    display: 'block',
    width: '100%',
    height: 'auto',
    maxHeight: 663,
  },
  cardButton: {
    marginTop: theme.spacing(3),
  },
}));

function CardFeedList({ cards, openCardDetails }) {
  const classes = useStyles();

  return (
    <div className={classes.feedWrapper}>
      <Grid container spacing={3}>
        {cards.map((card) => (
          <Grid key={card.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Paper className={classes.card} elevation={3}>
              <img className={classes.cardImage} src={card.imageUrl} alt={card.name} />
              <Button
                className={classes.cardButton}
                variant="contained"
                color="primary"
                onClick={() => openCardDetails(card)}
              >
                View Details
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

CardFeedList.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  openCardDetails: PropTypes.func.isRequired,
};

export default CardFeedList;
