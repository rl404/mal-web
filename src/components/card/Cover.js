import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import * as cons from '../../constant';
import { ellipsis } from '../../utils';
import ScoreBadge from '../badge/Score';
import FormatBadge from '../badge/Format';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 160,
    minWidth: 144,
    margin: 'auto',
  },
  media: {
    height: 220,
    filter: props => props.state ? 'blur(1px)' : '',
  },
  title: {
    display: 'block',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    padding: theme.spacing(1),
    background: theme.transparent.black[70],
    color: theme.palette.primary.contrastText,
    '& span': {
      color: 'white',
      lineHeight: 1.2,
    },
  },
  score: {
    display: 'block',
    position: 'absolute',
    top: 0,
    right: 0,
    padding: theme.spacing(1),
  },
  format: {
    display: 'block',
    position: 'absolute',
    top: 0,
    padding: theme.spacing(1),
  },
}));

const CoverCard = (props) => {
  const theme = useTheme();

  var imageURL = props.image;
  if (!imageURL || imageURL === '') {
    imageURL = theme.error.image;
  }

  const [state, setState] = React.useState(false);
  const hover = () => {
    setState(true);
  };
  const unhover = () => {
    setState(false);
  };

  const classes = useStyles({state: state});

  return (
    <Card className={classes.root}>
      <CardActionArea
        onMouseEnter={hover}
        onMouseOut={unhover}
        onClick={() => !props.onClick ? null : props.onClick(props.type, props.id)}>
        <CardMedia
          className={classes.media}
          image={imageURL}
          title={props.title}
        />
        <CardContent className={classes.title}>
          <Typography variant="caption">
            {state ? props.title : ellipsis(props.title, 20)}
          </Typography>
        </CardContent>
        <CardContent className={classes.score}>
          {state && props.score ? <ScoreBadge score={props.score} /> : null}
        </CardContent>
        <CardContent className={classes.format}>
          {state && props.format ? <FormatBadge type={props.type} format={props.format} /> : null}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

CoverCard.propTypes = {
  id: PropTypes.number,
  type: PropTypes.oneOf(cons.MAIN_TYPES),
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  format: PropTypes.number,
  score: PropTypes.number,
  onClick: PropTypes.func,
};

export default CoverCard;