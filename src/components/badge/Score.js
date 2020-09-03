import React from 'react';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  green: {
    background: '#00e676',
    color: 'black',
    boxShadow: theme.shadows[3],
  },
  blue: {
    background: '#2979ff',
    color: 'white',
    boxShadow: theme.shadows[3],
  },
  yellow: {
    background: '#ffea00',
    color: 'black',
    boxShadow: theme.shadows[3],
  },
  orange: {
    background: '#ff9100',
    color: 'black',
    boxShadow: theme.shadows[3],
  },
  red: {
    background: '#ff1744',
    color: 'white',
    boxShadow: theme.shadows[3],
  },
}));

const ScoreBadge = (props) => {
  const classes = useStyles();

  var score = props.score;
  if (!!props.Score) {
    score = 0;
  }

  score = Number(score).toFixed(2);

  var colorClass = '';
  if (score >= 8) {
    colorClass = classes.green;
  } else if (score < 8 && score >= 7) {
    colorClass = classes.blue;
  } else if (score < 7 && score >= 6) {
    colorClass = classes.yellow;
  } else if (score < 6 && score >= 5) {
    colorClass = classes.orange;
  } else if (score < 5 && score > 0) {
    colorClass = classes.red;
  }

  return (
    <Chip size="small" label={score} className={colorClass} />
  );
};

ScoreBadge.propTypes = {
  score: PropTypes.number.isRequired,
};

export default ScoreBadge;