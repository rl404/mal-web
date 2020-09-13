import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles({
  error: {
    width: props => props.width,
    height: props => props.width*4/3,
  },
  image: {
    maxHeight: props => props.height,
    maxWidth: '100%',
  },
});

const Img = (props) => {
  const classes = useStyles(props);
  const theme = useTheme();

  if (!props.src || props.src === '') {
    return <img src={theme.error.image} alt={props.alt} className={classes.error} />
  } else {
    return <img src={props.src} alt={props.alt} className={classes.image} />
  }
};

Img.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  src: PropTypes.string,
  alt: PropTypes.string,
};

Img.defaultProps = {
  height: 220,
  width: 160,
};

export default Img;