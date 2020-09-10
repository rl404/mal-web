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
  return (
    <Chip size="small" label={cons.ANIME_TYPES[props.type]} className={classes.root} />
  );
};

FormatBadge.propTypes = {
  type: PropTypes.number.isRequired,
};

export default FormatBadge;