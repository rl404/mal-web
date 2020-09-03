import React from 'react';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import StyledDivider from '../Divider';

const useStyles = makeStyles((theme) => ({
  marginTop: {
    marginTop: theme.spacing(1),
  },
}));

const StyledTitleLoading = () => {
  const classes = useStyles();

  return (
    <>
      <Typography variant='h6' className={classes.marginTop}>
        <Skeleton variant='text' width={150} />
      </Typography>
      <StyledDivider />
    </>
  );
};

export default StyledTitleLoading;