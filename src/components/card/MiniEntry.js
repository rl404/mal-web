import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: props => 'url(/images/white90.png), url(' + props.image + ')',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
  },
  height: {
    height: props => props.height,
    textShadow: '2px 2px white',
    '& h6': {
      lineHeight: '1.2'
    }
  },
  media: {
    width: '100%',
    height: props => props.height,
    objectFit: 'cover'
  },
}))

const MiniEntry = (props) => {
  const classes = useStyles(props);

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => props.onClick(props.entryId, props.entryType)} className={classes.container}>
        <Grid container spacing={1} className={classes.height}>
          <Grid item xs={4}>
            <img
              className={classes.media}
              src={props.image === '' ? '/images/grey.png' : props.image}
              alt={props.title}
            />
          </Grid>
          <Grid item xs container direction='column' spacing={1} justify="center" className={classes.height}>
            <Grid item>
              <Typography variant="subtitle1">
                <b>{props.title}</b>
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
  )
}

export default MiniEntry