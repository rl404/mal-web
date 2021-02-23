import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.appBar.background,
    color: theme.palette.appBar.color,
    boxShadow: theme.shadows[3],
  },
}));

const RankBadge = (props) => {
  const classes = useStyles();
  return <Chip size='small' label={<b>#{props.rank}</b>} className={classes.root} />;
};

RankBadge.propTypes = {
  rank: PropTypes.number.isRequired,
};

export default RankBadge;