import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import StyledDivider from '../../styled/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    width: theme.drawer.width,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    '& .MuiChip-sizeSmall': {
      margin: 2,
    }
  },
  skeletonCover: {
    margin: 'auto',
  },
  link: {
    color: 'black',
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  title: {
    paddingTop: theme.spacing(2),
    lineHeight: theme.typography.body1.lineHeight,
  },
  center: {
    textAlign: 'center',
  },
  categoryName: {
    color: theme.palette.primary.main,
  },
  synopsis: {
    whiteSpace: 'pre-line',
  },
  cover: {
    maxHeight: 220,
  },
}));

const EntryDrawerLoading = () => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="subtitle1" gutterBottom align='center' className={classes.title}>
        <Skeleton height={40} />
      </Typography>
      <StyledDivider />
      <Grid container spacing={1}>
        <Grid item xs={12} className={classes.center}>
          <Skeleton variant="rect" width={160} height={220} className={classes.skeletonCover} />
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle2" align="center" className={classes.categoryName}>
            <Skeleton height={80} />
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle2" align="center" className={classes.categoryName}>
            <Skeleton height={80} />
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle2" align="center" className={classes.categoryName}>
            <Skeleton height={80} />
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2" className={classes.categoryName}>
            <Skeleton width={70} />
          </Typography>
          <Typography variant="body2" className={classes.synopsis}>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <StyledDivider />
          <Skeleton height={40} />
        </Grid>
      </Grid>
    </>
  );
};

export default EntryDrawerLoading;