import React from 'react'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import * as cons from '../../constant';
import { ellipsis } from '../../utils';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: props => `url(${theme.overlay.image}), url(${props.image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
  },
  height: {
    height: props => props.height,
  },
  content: {
    height: props => props.height,
    '& h6': {
      lineHeight: '1.2',
    },
  },
  media: {
    width: '100%',
    height: props => props.height,
    objectFit: 'cover',
  },
}))

const EntryCard = (props) => {
  const classes = useStyles(props);
  const theme = useTheme();

  var imageURL = props.image;
  if (!imageURL || imageURL === '') {
    imageURL = theme.error.image;
  }

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => props.onClick(props.type, props.id)}>
        <Grid container spacing={1} className={classes.height}>
          <Grid item xs={4}>
            <img
              className={classes.media}
              src={imageURL}
              alt={props.title}
            />
          </Grid>
          <Grid item xs container direction='column' spacing={1} justify="center" className={classes.content}>
            <Grid item>
              <Typography variant="subtitle1">
                <b>{ellipsis(props.title, 40)}</b>
              </Typography>
            </Grid>
            {!props.detail || props.detail.length === 0 ? null :
              <Grid item>
                <Typography variant="caption">
                  {props.detail.map((d) => d).reduce((prev, curr) => [prev, ' · ', curr])}
                </Typography>
              </Grid>
            }
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
};

EntryCard.propTypes = {
  id: PropTypes.number,
  type: PropTypes.oneOf(cons.MAIN_TYPES),
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  detail: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func,
  height: PropTypes.number,
};

EntryCard.defaultProps = {
  height: 130,
};

export default EntryCard;