import React from 'react';
import ErrorIcon from '@material-ui/icons/Error';
import Typography from '@material-ui/core/Typography';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
    display: 'flex',
    maxWidth: 135,
  },
  iconArea: {
    textAlign: 'center',
    paddingRight: theme.spacing(1),
  },
}));

const ErrorArea = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.iconArea}>
        <ErrorIcon />
      </div>
      <div className={classes.content}>
        <Typography variant='h5'>
          Error {props.code}
        </Typography>
        <Typography variant='subtitle1'>
          {props.message}
        </Typography>
      </div>
    </div>
  );
};

ErrorArea.propTypes = {
  code: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
};

export default ErrorArea;