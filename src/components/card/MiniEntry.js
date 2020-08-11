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
    width: 300,
    height: 110
  },
  media: {
    width: 80,
    height: 110
  },
  title: {
    display: 'block',
    position: 'absolute',
    width: 145,
    height: 95,
    top: 0,
    left: 80,
    padding: theme.spacing(1),
    '& span': {
      lineHeight: 1.2
    }
  },
  relation: {
    position: 'absolute',
    bottom: 8
  }
}))

const MiniEntry = (props) => {
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
          <Typography variant="subtitle2">
            {props.title}
          </Typography>
          <Typography variant="caption" className={classes.relation}>
            {props.entryType} · {props.relation}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default MiniEntry