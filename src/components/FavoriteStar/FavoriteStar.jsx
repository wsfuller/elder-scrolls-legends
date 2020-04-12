import React from 'react';
import PropTypes from 'prop-types';
import { FaStar, FaRegStar } from 'react-icons/fa';

function FavoriteStar({ className, isFavorited, clickEvent, itemToFavorite }) {
  if (isFavorited) {
    return <FaStar className={className} onClick={() => clickEvent(itemToFavorite)} />;
  }

  return <FaRegStar className={className} onClick={() => clickEvent(itemToFavorite)} />;
}

FavoriteStar.propTypes = {
  className: PropTypes.string.isRequired,
  isFavorited: PropTypes.bool.isRequired,
  clickEvent: PropTypes.func.isRequired,
  itemToFavorite: PropTypes.string.isRequired,
};

export default FavoriteStar;
