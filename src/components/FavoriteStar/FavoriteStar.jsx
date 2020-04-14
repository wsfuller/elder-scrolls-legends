import React from 'react';
import PropTypes from 'prop-types';
import { FaStar, FaRegStar } from 'react-icons/fa';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

function FavoriteStar({ className, isFavorited, clickEvent, itemToFavorite }) {
  return (
    <Tooltip title={isFavorited ? 'Unfavorite' : 'Favorite'}>
      <IconButton
        size="large"
        className={className}
        onClick={() => clickEvent(itemToFavorite)}
        aria-label="favorite"
      >
        {isFavorited ? <FaStar /> : <FaRegStar />}
      </IconButton>
    </Tooltip>
  );
}

FavoriteStar.propTypes = {
  className: PropTypes.string.isRequired,
  isFavorited: PropTypes.bool.isRequired,
  clickEvent: PropTypes.func.isRequired,
  itemToFavorite: PropTypes.string.isRequired,
};

export default FavoriteStar;
