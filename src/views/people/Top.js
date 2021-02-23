import React from 'react';
import Grid from '@material-ui/core/Grid';
import { reparse } from '../../api';
import * as cons from '../../constant';
import Error from '../../components/error/Error';
import Img from '../../components/image/Img';
import Ellipsis from '../../components/text/Ellipsis';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import RefreshIcon from '@material-ui/icons/Refresh';
import { parseTime } from '../../utils';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import Skeleton from '@material-ui/lab/Skeleton';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

const useStyles = makeStyles((theme) => ({
  image: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundImage: props => `url(${theme.overlay}), url(${props.image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    overflow: 'hidden',
  },
  content: {
    paddingLeft: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 0,
    },
  },
  divider: {
    marginBottom: theme.spacing(1),
  },
  message: {
    marginTop: theme.spacing(0.6),
  },
  synopsis: {
    whiteSpace: 'pre-wrap',
  },
}));

const Top = (props) => {
  const state = props.state

  var classes = useStyles(!state.data ? [] : state.data);

  const refresh = async () => {
    const result = await reparse(cons.PEOPLE_TYPE, state.data.id);
    setRefreshState({ loading: false, message: !result.data || result.data === '' ? result.message : result.data });
  };

  const [refreshState, setRefreshState] = React.useState({
    loading: false,
    message: '',
  });
  var timeout = 0;
  const onClickRefresh = () => {
    setRefreshState({ ...refreshState, loading: true });
    refresh();
    clearTimeout(timeout);
    timeout = setTimeout(() => { setRefreshState({ ...refreshState, message: '' }) }, 5000);
  };

  return (
    <>
      {!state ? null : state.loading ? <Loading /> :
        state.error !== null ? <Error code={state.error.code} message={state.error.message} /> :
          <Grid container spacing={1}>
            <Grid item xs={12} md={3} className={classes.image}>
              <Img src={state.data.image} alt={state.data.name} height={300} />
            </Grid>
            <Grid item xs={12} md={9}>
              <Grid container spacing={1} className={classes.content}>
                <Grid item xs>
                  <Typography variant='h6'>
                    <b>{state.data.name}</b>
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2" className={classes.message}>
                    Favorites: {state.data.favorite.toLocaleString()}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant='subtitle2' className={classes.message}>
                    {refreshState.message}
                  </Typography>
                </Grid>
                <Grid item>
                  <Tooltip placement='bottom-end' title={parseTime(state.meta.parsedAt, 'YYYY-MM-DD HH:mm:ss')}>
                    {refreshState.loading ?
                      <CircularProgress color='inherit' size={15} className={classes.message} /> :
                      <IconButton size='small' onClick={onClickRefresh}>
                        <RefreshIcon />
                      </IconButton>
                    }
                  </Tooltip>
                </Grid>
                <Grid item>
                  <a href={`${cons.MAL_URL}/${cons.PEOPLE_TYPE}/${state.data.id}`} target='_blank' rel='noopener noreferrer'>
                    <Tooltip placement='bottom-end' title='MyAnimeList Page'>
                      <IconButton size='small'>
                        <OpenInNewIcon />
                      </IconButton>
                    </Tooltip>
                  </a>
                </Grid>
              </Grid>
              <Divider className={classes.divider} />
              <Grid container spacing={1} className={classes.content}>
                <Grid item xs={12}>
                  {state.data.givenName === '' ? null :
                    <Typography >
                      <span>Given Name:</span> {state.data.givenName}
                    </Typography>
                  }
                  {state.data.familyName === '' ? null :
                    <Typography >
                      <span>Family Name:</span> {state.data.familyName}
                    </Typography>
                  }
                  {state.data.alternativeNames.length === 0 ? null :
                    <Typography >
                      <span>Alternative names:</span> {state.data.alternativeNames.join(", ")}
                    </Typography>
                  }
                  <Typography className={classes.synopsis}>
                    <Ellipsis text={state.data.more} limit={1000} />
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
      }
    </>
  );
};

Top.propTypes = {
  state: PropTypes.object.isRequired,
};

export default Top;

const Loading = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={3}>
        <Skeleton variant='rect' height={300} />
      </Grid>
      <Grid item xs={12} md={9}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Skeleton height={40} />
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Skeleton height={30} />
            <Skeleton height={30} />
            <Skeleton height={30} />
            <Skeleton height={30} />
            <Skeleton height={30} />
            <Skeleton height={30} />
            <Skeleton width={80} height={30} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}