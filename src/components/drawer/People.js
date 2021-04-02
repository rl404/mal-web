import React from 'react';
import Error from '../error/Error';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import * as cons from '../../constant';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { slugify } from '../../utils';
import Img from '../image/Img';
import Ellipsis from '../text/Ellipsis';
import Skeleton from '@material-ui/lab/Skeleton';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
    '&:hover': {
      color: theme.palette.link,
    },
  },
  title: {
    lineHeight: theme.typography.body2.lineHeight,
  },
  center: {
    textAlign: 'center',
  },
  categoryName: {
    color: theme.palette.icon,
  },
  synopsis: {
    whiteSpace: 'pre-line',
  },
  divider: {
    marginBottom: theme.spacing(0.5),
  },
}));

const People = (props) => {
  const classes = useStyles();
  const state = props.state;
  return (
    <>
      {!state ? null : state.loading ? <Loading /> :
        state.error !== null ? <Error code={state.error.code} message={state.error.message} /> :
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Link to={`/${state.entryType}/${state.entryId}/${slugify(state.data.name)}`} className={classes.link} onClick={props.hideDrawer}>
                <Typography variant='h6' align='center' className={classes.title}>
                  <b>{state.data.name}</b>
                </Typography>
              </Link>
              <Divider />
            </Grid>
            <Grid item xs={12} className={classes.center}>
              <Img src={state.data.image} alt={state.data.name} width='100%' />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='subtitle2' className={classes.categoryName}>
                About
              </Typography>
              <Typography className={classes.synopsis}>
                <Ellipsis text={state.data.more} limit={500} />
              </Typography>
            </Grid>
          </Grid>
      }
    </>
  );
};

People.propTypes = {
  state: PropTypes.shape({
    data: PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.string,
      more: PropTypes.string.isRequired,
    }),
    loading: PropTypes.bool.isRequired,
    error: PropTypes.shape({
      code: PropTypes.number,
      message: PropTypes.string,
    }),
    entryType: PropTypes.oneOf([cons.PEOPLE_TYPE]).isRequired,
    entryId: PropTypes.number.isRequired,
  }),
  hideDrawer: PropTypes.func.isRequired,
};

export default People;

const Loading = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Skeleton height={40} />
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Skeleton variant='rect' height={200} width={160} style={{ margin: 'auto' }} />
      </Grid>
      <Grid item xs={12}>
        <Skeleton height={30} width={70} />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton width={80} />
      </Grid>
    </Grid>
  );
};