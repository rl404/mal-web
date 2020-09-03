import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
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
        <Grid item xs={6}>
          <CardActionArea onClick={() => props.onClick(left.type, left.id)}>
            <Grid container className={classes.height}>
              <Grid item xs={4}>
                <img
                  className={classes.media}
                  src={leftImageURL}
                  alt={left.name}
                />
              </Grid>
              <Grid item xs container direction='column' justify="center">
                <Grid item>
                  <Typography variant="subtitle1">
                    <b>{left.name}</b>
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
          <Grid item xs={6}>
            <CardActionArea onClick={() => props.onClick(right.type, right.id)}>
              <Grid container className={classes.height}>
                <Grid item xs container direction='column' justify="center">
                  <Grid item>
                    <Typography variant="subtitle1" align='right'>
                      <b>{right.name}</b>
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