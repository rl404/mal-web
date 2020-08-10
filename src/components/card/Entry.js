import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 160,
    height: 220
  },
  media: {
    height: 220,
    width: 160
  },
  title: {
    display: 'block',
    position: 'absolute',
    width: 145,
    bottom: 0,
    padding: theme.spacing(1),
    background: 'rgba(0,0,0,0.7)',
    color: theme.palette.primary.contrastText,
    '& span': {
      lineHeight: 1.2
    }
  }
}));

const Entry = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => props.onClick(props.entryId, props.entryType)}>
        <CardMedia
          className={classes.media}
          image={props.image}
          title={props.title}
        />
        <CardContent className={classes.title}>
          <Typography variant="caption">
            {props.title || <Skeleton variant="text" />}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default Entry

export const EntryLoading = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Skeleton variant="rect" width={160} height={220} />
      </CardActionArea>
    </Card>
  )
}