import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import * as cons from '../../constant';
import Img from '../image/Img';
import { ellipsis } from '../../utils';
import Score from '../badge/Score';
import Format from '../badge/Format';
import Rank from '../badge/Rank';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '133%',
    position: 'relative',
  },
  content: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  title: {
    display: 'block',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    padding: theme.spacing(0.5),
    background: theme.palette.transparent.black[70],
    color: theme.palette.common.white,
  },
  score: {
    display: 'block',
    position: 'absolute',
    top: 0,
    right: 0,
  },
  format: {
    display: 'block',
    position: 'absolute',
    top: 0,
  },
}));

const Cover = (props) => {
  const [hoverState, setHoverState] = React.useState(false);
  const hover = () => { setHoverState(true); };
  const unhover = () => { setHoverState(false); };

  const classes = useStyles({ hoverState: hoverState });

  return (
    <Card
      className={classes.root}
      onMouseEnter={hover}
      onMouseOut={unhover}
      onClick={() => !props.onClick ? null : props.onClick(props.type, props.id)}
    >
      <CardActionArea className={classes.content}>
        <Img
          src={props.image}
          alt={props.title}
          width='100%'
          filter={hoverState ? 'blur(1px)' : ''}
        />
        <CardContent className={classes.title}>
          <Typography variant='caption'>
            {hoverState ? props.title : ellipsis(props.title, 20)}
          </Typography>
        </CardContent>
        <CardContent className={classes.score}>
          {hoverState && props.score ? <Score score={props.score} /> : null}
        </CardContent>
        <CardContent className={classes.format}>
          {hoverState && props.format ? <Format type={props.type} format={props.format} /> : null}
        </CardContent>
        <CardContent className={classes.format}>
          {hoverState || !props.rank ? null : <Rank rank={props.rank} />}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

Cover.propTypes = {
  id: PropTypes.number,
  type: PropTypes.oneOf(cons.MAIN_TYPES),
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  format: PropTypes.number,
  score: PropTypes.number,
  onClick: PropTypes.func,
  rank: PropTypes.number,
};

export default Cover;