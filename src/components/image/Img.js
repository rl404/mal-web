import React from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';
import { useTheme } from '@material-ui/core/styles';

const Img = (props) => {
  const theme = useTheme();

  var w = props.width
  var h = props.height

  // if (!props.height || props.height === 0) {
  //   h = w * 4 / 3;
  //   if (w === '100%') {
  //     h = '100%';
  //   }
  // }

  // if (!props.width || props.width === 0) {
  //   w = h * 3 / 4;
  //   if (h === '100%') {
  //     w = '100%';
  //   }
  // }

  return (
    <LazyLoad height={h} width={w}>
      {!props.src || props.src === '' ?
        <div style={{
          width: w === '100%' ? '100vw' : w,
          height: h === '100%' ? '100vh' : h,
          backgroundColor: theme.palette.primary.main,
          opacity: 0.5,
        }} />
        :
        <img src={props.src} alt={props.alt} style={{
          objectFit: 'cover',
          width: w,
          height: h,
          filter: props.filter,
        }} />
      }
    </LazyLoad>
  );
};

Img.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  src: PropTypes.string,
  alt: PropTypes.string,
  filter: PropTypes.string,
};

export default Img;