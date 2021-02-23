import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  details: {
    display: 'flex',
    height: 80,
    [theme.breakpoints.down('sm')]: {
      height: 60,
    },
  },
  icon: {
    color: theme.palette.icon,
    '& svg': {
      fontSize: '2.5rem',
      [theme.breakpoints.down('sm')]: {
        fontSize: '1.8rem',
      },
    },
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  dataArea: {
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
  data: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
  },
  name: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8rem',
    },
  },
}));

const Stats = (props) => {
  const classes = useStyles(props);

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.details}>
        {!props.icon ? null :
          <CardContent className={classes.icon}>
            {props.icon}
          </CardContent>
        }
        <CardContent className={classes.dataArea}>
          <Typography variant="h5" className={classes.data}>
            <b>{props.data}</b>
          </Typography>
          <Typography variant='subtitle1' color="textSecondary" className={classes.name}>
            {props.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

Stats.propTypes = {
  icon: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  data: PropTypes.any.isRequired,
};

export default Stats;
