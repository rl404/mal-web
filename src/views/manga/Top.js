import React from 'react';
import Grid from '@material-ui/core/Grid';
import { reparse } from '../../api';
import * as cons from '../../constant';
import Error from '../../components/error/Error';
import Img from '../../components/image/Img';
import Ellipsis from '../../components/text/Ellipsis';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import RefreshIcon from '@material-ui/icons/Refresh';
import { capitalize, parseTime } from '../../utils';
import { Link } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import Stats from '../../components/card/Stats';
import PersonIcon from '@material-ui/icons/Person';
import FavoriteIcon from '@material-ui/icons/Favorite';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import GradeIcon from '@material-ui/icons/Grade';
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
  altTitle: {
    color: theme.palette.grey[500],
    '& span': {
      fontWeight: 'bold',
    },
  },
  message: {
    marginTop: theme.spacing(0.6),
  },
  synopsis: {
    whiteSpace: 'pre-wrap',
  },
  genre: {
    margin: theme.spacing(0.5),
  },
}));

const Top = (props) => {
  const state = props.state

  var classes = useStyles(!state.data ? [] : state.data);

  const [altState, setAltState] = React.useState(false);
  const toggleAlt = () => {
    setAltState(!altState);
  };

  const refresh = async () => {
    const result = await reparse(cons.MANGA_TYPE, state.data.id);
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
              <Img src={state.data.image} alt={state.data.title} height={300} />
            </Grid>
            <Grid item xs={12} md={9}>
              <Grid container spacing={1} className={classes.content}>
                <Grid item xs>
                  <Typography variant='h6'>
                    <b>{state.data.title}</b>
                    {state.data.alternativeTitles.english === '' && state.data.alternativeTitles.japanese === '' && state.data.alternativeTitles.synonym === '' ? null :
                      <Tooltip title='Alternative titles' placement='right'>
                        <IconButton size='small' onClick={toggleAlt}>
                          <ArrowDropDownIcon />
                        </IconButton>
                      </Tooltip>
                    }
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
                  <a href={`${cons.MAL_URL}/${cons.MANGA_TYPE}/${state.data.id}`} target='_blank' rel='noopener noreferrer'>
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
                {!altState ? null :
                  <Grid item xs={12} className={classes.altTitle}>
                    {Object.keys(state.data.alternativeTitles).map(key => {
                      if (state.data.alternativeTitles[key] === '' || !altState) {
                        return null;
                      } else {
                        return (
                          <Typography key={key}>
                            <span>{capitalize(key)}:</span> {state.data.alternativeTitles[key]}
                          </Typography>
                        );
                      }
                    })}
                  </Grid>
                }
                <Grid item xs={12}>
                  <Typography className={classes.synopsis}>
                    <Ellipsis text={state.data.synopsis} limit={1000} />
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  {state.data.genres.map(genre => {
                    return (
                      <Link to={`/search/manga?genre=${genre.id}`} key={genre.id}>
                        <Chip size='small' label={genre.name} color='primary' className={classes.genre} clickable />
                      </Link>
                    )
                  })}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs>
                  <Stats
                    icon={<EqualizerIcon />}
                    data={'#' + state.data.rank.toLocaleString()}
                    name='Rank'
                  />
                </Grid>
                <Grid item xs>
                  <Stats
                    icon={<GradeIcon />}
                    data={
                      <Tooltip title={state.data.voter.toLocaleString() + ' voters'} placement='top'>
                        <b>{Number(state.data.score).toFixed(2)}</b>
                      </Tooltip>}
                    name='Score'
                  />
                </Grid>
                <Grid item xs>
                  <Stats
                    icon={<ThumbUpIcon />}
                    data={'#' + state.data.popularity.toLocaleString()}
                    name='Popularity'
                  />
                </Grid>
                <Grid item xs>
                  <Stats
                    icon={<PersonIcon />}
                    data={state.data.member.toLocaleString()}
                    name='Members'
                  />
                </Grid>
                <Grid item xs>
                  <Stats
                    icon={<FavoriteIcon />}
                    data={state.data.favorite.toLocaleString()}
                    name='Favorites'
                  />
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
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={2}>
                <Skeleton height={40} />
              </Grid>
              <Grid item xs={2}>
                <Skeleton height={40} />
              </Grid>
              <Grid item xs={2}>
                <Skeleton height={40} />
              </Grid>
              <Grid item xs={2}>
                <Skeleton height={40} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={1}>
          <Grid item xs><Skeleton variant='rect' height={90} /></Grid>
          <Grid item xs><Skeleton variant='rect' height={90} /></Grid>
          <Grid item xs><Skeleton variant='rect' height={90} /></Grid>
          <Grid item xs><Skeleton variant='rect' height={90} /></Grid>
          <Grid item xs><Skeleton variant='rect' height={90} /></Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}