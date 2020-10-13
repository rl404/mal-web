import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import { ellipsis } from '../../utils';
import * as cons from '../../constant';

const useStyles = makeStyles((theme) => ({
  root: {
  },
  height: {
    height: props => props.height,
  },
  media: {
    width: '100%',
    height: props => props.height,
    objectFit: 'cover',
  },
  leftArea: {
    backgroundImage: props => `url(${theme.overlay.image}), url(${props.left.image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
  },
  rightArea: {
    backgroundImage: props => `url(${theme.overlay.image}), url(${!props.right ? '' : props.right.image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
  },
  leftContent: {
    paddingLeft: theme.spacing(1),
  },
  rightContent: {
    paddingRight: theme.spacing(1),
  },
}));

const DualCard = (props) => {
  const classes = useStyles(props);
  const theme = useTheme();

  const left = props.left;
  const right = props.right;

  var leftImageURL = !left ? '' : left.image;
  if (!leftImageURL || leftImageURL === '') {
    leftImageURL = theme.error.image;
  }

  var rightImageURL = !right ? '' : right.image;
  if (!rightImageURL || rightImageURL === '') {
    rightImageURL = theme.error.image;
  }

  return (
    <Card className={classes.root}>
      <Grid container className={classes.height}>
        <Grid item xs={6} className={classes.leftArea}>
          <CardActionArea onClick={() => props.onClick(left.type, left.id)}>
            <Grid container className={classes.height}>
              <Grid item xs={4}>
                <img
                  className={classes.media}
                  src={leftImageURL}
                  alt={left.name}
                />
              </Grid>
              <Grid item xs={8} container direction='column' justify="center" className={classes.leftContent}>
                <Grid item>
                  <Typography variant="subtitle1">
                    <b>{ellipsis(left.name, 20)}</b>
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    {left.detail}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </CardActionArea>
        </Grid>
        {!right ? null :
          <Grid item xs={6} className={classes.rightArea}>
            <CardActionArea onClick={() => props.onClick(right.type, right.id)}>
              <Grid container className={classes.height}>
                <Grid item xs={8} container direction='column' justify="center" className={classes.rightContent}>
                  <Grid item>
                    <Typography variant="subtitle1" align='right'>
                      <b>{ellipsis(right.name, 20)}</b>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography align='right'>
                      {right.detail}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <img
                    className={classes.media}
                    src={rightImageURL}
                    alt={right.name}
                  />
                </Grid>
              </Grid>
            </CardActionArea>
          </Grid>
        }
      </Grid>
    </Card>
  );
};

DualCard.propTypes = {
  left: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.oneOf(cons.MAIN_TYPES),
    name: PropTypes.string.isRequired,
    image: PropTypes.string,
    detail: PropTypes.string,
  }).isRequired,
  rigth: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.oneOf(cons.MAIN_TYPES),
    name: PropTypes.string.isRequired,
    image: PropTypes.string,
    detail: PropTypes.string,
  }),
  height: PropTypes.number,
  onClick: PropTypes.func,
};

DualCard.defaultProps = {
  height: 130,
};

export default DualCard;