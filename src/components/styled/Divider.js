import React from 'react';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  divider: {
    marginBottom: theme.spacing(2),
  },
}));

const StyledDivider = () => {
  const classes = useStyles();
  return <Divider className={classes.divider} />;
};

export default StyledDivider;