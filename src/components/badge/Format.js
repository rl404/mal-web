import React from 'react';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import * as cons from '../../constant';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.gradient.main,
    color: 'white',
    boxShadow: theme.shadows[3],
  },
}));

const FormatBadge = (props) => {
  const classes = useStyles();

  var t = cons.ANIME_TYPES[props.format];
  if (props.type === cons.MANGA_TYPE) {
    t = cons.MANGA_TYPES[props.format];
  }

  return (
    <Chip size="small" label={t} className={classes.root} />
  );
};

FormatBadge.propTypes = {
  type: PropTypes.oneOf([cons.ANIME_TYPE, cons.MANGA_TYPE]).isRequired,
  format: PropTypes.number.isRequired,
};

export default FormatBadge;