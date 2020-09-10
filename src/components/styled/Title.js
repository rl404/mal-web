import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import StyledDivider from './Divider';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
  },
  icon: {
    color: theme.palette.primary.main,
  },
  viewMore: {
    textAlign: 'right',
  },
}));

const StyledTitle = (props) => {
  const classes = useStyles();

  return (
    <>
      <Grid container direction="row" alignItems="center" spacing={1} className={classes.root}>
        <Grid item className={classes.icon}>
          {props.icon}
        </Grid>
        <Grid item>
          <Typography variant="h6">
            <b>{props.title}</b>
          </Typography>
        </Grid>
        {!props.more ? null :
          <Grid item xs className={classes.viewMore}>
            <Link to={props.more.link}>
              <Button size="small" color="primary">{props.more.text}</Button>
            </Link>
          </Grid>
        }
      </Grid>
      <StyledDivider />
    </>
  );
};

StyledTitle.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string.isRequired,
  more: PropTypes.shape({
    link: PropTypes.string,
    text: PropTypes.string,
  }),
};

export default StyledTitle;