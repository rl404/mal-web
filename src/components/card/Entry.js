import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import * as cons from '../../constant';
import { ellipsis } from '../../utils';
import { CardContent } from '@material-ui/core';
import LazyLoad from 'react-lazyload';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '35%',
    position: 'relative',
    backgroundImage: props =>
      props.props.image2 && props.props.image2 !== '' ?
        !props.state ?
          `url(${theme.overlay}), url(${props.props.image2})` :
          `url(${theme.overlay}), url(${props.props.image})` :
        `url(${theme.overlay}), url(${props.props.image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    overflow: 'hidden',
  },
  content: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  grid: {
    height: '100%',
  },
  image: {
    background: theme.palette.primary.main,
    backgroundImage: props =>
      !props.state || !props.props.image2 || props.props.image2 === '' ?
        `url(${props.props.image})` :
        `url(${props.props.image2})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
  },
  data: {

  },
  detail: {
    color: theme.palette.grey[500],
  },
}));

const Entry = (props) => {
  const [state, setState] = React.useState(false);
  const hover = () => setState(true);
  const unhover = () => setState(false);

  const classes = useStyles({ props: props, state: state });

  return (
    <LazyLoad>
      <Card className={classes.root} onMouseEnter={hover} onMouseLeave={unhover}>
        <CardActionArea className={classes.content} onClick={() => !props.onClick ? null : props.onClick(props.type, props.id)}>
          <Grid container className={classes.grid}>
            <Grid item xs={4} className={classes.image} />
            <Grid item xs={8}>
              <CardContent className={classes.data}>
                <Typography variant="subtitle2">
                  <b>{ellipsis(!state || !props.title2 || props.title2 === '' ? props.title : props.title2, 25)}</b>
                </Typography>
                {!props.detail ? null :
                  <Typography variant="caption" className={classes.detail}>
                    {!state || !props.detail2 || props.detail2 === '' ? props.detail : props.detail2}
                  </Typography>
                }
              </CardContent>
            </Grid>
          </Grid>
        </CardActionArea>
      </Card>
    </LazyLoad>
  );
};

Entry.propTypes = {
  id: PropTypes.number,
  type: PropTypes.oneOf(cons.MAIN_TYPES),
  image: PropTypes.string,
  image2: PropTypes.string,
  title: PropTypes.string.isRequired,
  title2: PropTypes.string,
  detail: PropTypes.string,
  detail2: PropTypes.string,
  onClick: PropTypes.func,
};

export default Entry;