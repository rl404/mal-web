import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: props => props.width,
    margin: 'auto',
    '& svg': {
      fontSize: '2.5rem',
    },
    '& .MuiCardContent-root:last-child': {
      paddingBottom: theme.spacing(2),
    },
  },
  details: {
    display: 'flex',
  },
}));

const StatsCard = (props) => {
  const classes = useStyles(props);

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.details}>
        <CardContent>
          {props.icon}
        </CardContent>
        <CardContent>
          <Typography variant="h5">
            <b>{props.data}</b>
          </Typography>
          <Typography color="textSecondary">
            {props.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default StatsCard;
