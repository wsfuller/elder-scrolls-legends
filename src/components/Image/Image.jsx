import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { makeStyles } from '@material-ui/core/styles';

import placeholder from './placeholder.jpg';

const useStyles = makeStyles((theme) => ({
  image: {
    display: 'block',
    width: '100%',
    height: 'auto',
    maxHeight: 663,
  },
  imageContainer: {
    width: '100%',
    minHeight: 400,
    backgroundImage: `url(${placeholder})`,
    backgroundRepeat: 'no-repeat',
    filter: 'blur(30px)',
    transition: 'all .5s ease-in',
    transitionDelay: '.25s',
    [theme.breakpoints.down('lg')]: {
      minHeight: 530,
    },
    [theme.breakpoints.down('xl')]: {
      minHeight: 390,
    },
  },
  imageContainerRemoveBlur: {
    minHeight: 'auto',
    filter: 'blur(0)',
    backgroundImage: 'none',
  },
}));

function Image({ source, alt }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const classes = useStyles();
  const imageClass = cx(classes.imageContainer, imageLoaded && classes.imageContainerRemoveBlur);

  return (
    <div className={imageClass}>
      <img onLoad={() => setImageLoaded(true)} className={classes.image} src={source} alt={alt} />
    </div>
  );
}

Image.propTypes = {
  source: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default Image;
