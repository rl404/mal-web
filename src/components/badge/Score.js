import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  green: {
    background: 'rgba(0,255,0,0.7)',
    color: 'white'
  },
  blue: {
    background: 'rgba(0,0,255,0.7)',
    color: 'white'
  },
  yellow: {
    background: 'yellow'
  },
  orange: {
    background: 'orange'
  },
  red: {
    background: 'rgba(255,0,0,0.7)',
    color: 'white'
  }
}))

const ScoreBadge = (props) => {
  var score = props.score
  if (!!props.Score) {
    score = 0
  }

  score = Number(score).toFixed(2);

  const classes = useStyles();

  var colorClass = ''
  if (score >= 8) {
    colorClass = classes.green
  } else if (score < 8 && score >= 7) {
    colorClass = classes.blue
  } else if (score < 7 && score >= 6) {
    colorClass = classes.yellow
  } else if (score < 6 && score >= 5) {
    colorClass = classes.orange
  } else if (score < 5 && score > 0) {
    colorClass = classes.red
  }

  return (
    <Chip size="small" label={score} className={colorClass} />
  )
}

export default ScoreBadge