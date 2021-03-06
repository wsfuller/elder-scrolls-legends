import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import Image from '../Image';
import FavoriteStar from '../FavoriteStar';

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
    position: 'relative',
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
  favoriteStar: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: theme.palette.warning.main,
    zIndex: 10,
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

function CardFeedList({ cards, openCardDetails, favoriteCardToggle }) {
  const classes = useStyles();

  return (
    <div className={classes.feedWrapper}>
      <Grid container spacing={3}>
        {cards.map((card) => (
          <Grid key={card.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Paper className={classes.card} elevation={3}>
              <FavoriteStar
                className={classes.favoriteStar}
                isFavorited={card.favorited}
                clickEvent={favoriteCardToggle}
                itemToFavorite={card.id}
              />
              <Image source={card.imageUrl} alt={card.name} />
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
  favoriteCardToggle: PropTypes.func.isRequired,
};

export default CardFeedList;
