import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Chip from '@material-ui/core/Chip';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PersonIcon from '@material-ui/icons/Person';
import FavoriteIcon from '@material-ui/icons/Favorite';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import AssessmentIcon from '@material-ui/icons/Assessment';
import Paper from '@material-ui/core/Paper';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import { getEntryDetail } from '../../../api';
import * as cons from '../../../constant';
import { capitalize } from '../../../utils';
import Details from './Details';
import Characters from './Characters';
import Staff from './Staff';
import EllipsisText from '../../../components/text/EllipsisText';
import StyledDivider from '../../../components/styled/Divider';
import StatsCard from '../../../components/card/Stats';
import ErrorArea from '../../../components/error/Error';

const useStyles = makeStyles((theme) => ({
  cover: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: props => `url(${theme.overlay.white}), url(${props.cover})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    [theme.breakpoints.up('md')]: {
      maxWidth: 260,
      backgroundClip: 'padding-box',
      borderTop: '6px solid transparent',
      borderBottom: '2px solid transparent',
      borderRight: '18px solid transparent',
      borderLeft: '18px solid transparent',
    },
  },
  loadingCover: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      maxWidth: 260,
    }
  },
  altTitle: {
    color: theme.palette.grey[500],
    '& span': {
      fontWeight: 'bold',
    }
  },
  synopsis: {
    whiteSpace: 'pre-wrap',
  },
  genre: {
    margin: 2,
  },
  stats: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  tab: {
    marginBottom: theme.spacing(2),
  }
}));

const AnimeDetails = (props) => {
  const idRef = React.useRef('');
  const [state, setState] = React.useState({
    id: 0,
    data: null,
    loading: true,
    altTitle: false,
    tabValue: 0,
    error: null,
  });

  var classes = useStyles(!state.data ? [] : state.data);

  React.useEffect(() => {
    if ((state.data === null && state.error === null) || idRef.current !== props.match.params.id) {
      idRef.current = props.match.params.id;

      const getData = async () => {
        const result = await getEntryDetail(cons.ANIME_TYPE, props.match.params.id);
        if (result.status === cons.CODE_OK) {
          setState({ ...state, id: props.match.params.id, data: result.data, loading: false });
        } else {
          setState({ ...state, id: props.match.params.id, error: { code: result.status, message: result.message }, loading: false });
        }
      }
      getData();
    }
  });

  const toggleAlt = () => {
    setState({ ...state, altTitle: !state.altTitle });
  };

  const changeTab = (event, newValue) => {
    setState({ ...state, tabValue: newValue });
  };

  return (
    <>
      {!state ? null : state.loading ? <AnimeDetailsLoading /> :
        state.error !== null ? <ErrorArea code={state.error.code} message={state.error.message} /> :
          <Grid container spacing={1}>
            <Grid item xs={12} className={classes.cover}>
              <img src={state.data.cover} alt={state.data.title} />
            </Grid>

            <Grid item md xs={12}>
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
              <StyledDivider />

              {Object.keys(state.data.alternativeTitles).map(key => {
                if (state.data.alternativeTitles[key] === '' || !state.altTitle) {
                  return null;
                } else {
                  return (
                    <Typography variant='subtitle2' key={key} className={classes.altTitle}>
                      <span>{capitalize(key)}:</span> {state.data.alternativeTitles[key]}
                    </Typography>
                  );
                }
              })}

              <Typography variant='subtitle2' className={classes.synopsis}>
                <EllipsisText text={state.data.synopsis} limit={1000} />
              </Typography>

              {state.data.genres.map(genre => {
                return (
                  <Chip size='small' label={genre.name} color='primary' key={genre.id} className={classes.genre} />
                )
              })}
            </Grid>

            <Grid item xs={12} container spacing={1} justify='center' className={classes.stats}>
              <Grid item xs>
                <StatsCard
                  width={200}
                  icon={<EqualizerIcon />}
                  data={'#' + state.data.rank.toLocaleString()}
                  name='Rank'
                />
              </Grid>
              <Grid item xs>
                <StatsCard
                  width={200}
                  icon={<AssessmentIcon />}
                  data={
                    <Tooltip title={state.data.voter.toLocaleString() + ' voters'} placement='top'>
                      <b>{Number(state.data.score).toFixed(2)}</b>
                    </Tooltip>}
                  name='Score'
                />
              </Grid>
              <Grid item xs>
                <StatsCard
                  width={200}
                  icon={<ThumbUpIcon />}
                  data={'#' + state.data.popularity.toLocaleString()}
                  name='Popularity'
                />
              </Grid>
              <Grid item xs>
                <StatsCard
                  width={200}
                  icon={<PersonIcon />}
                  data={state.data.member.toLocaleString()}
                  name='Members'
                />
              </Grid>
              <Grid item xs>
                <StatsCard
                  width={200}
                  icon={<FavoriteIcon />}
                  data={state.data.favorite.toLocaleString()}
                  name='Favorites'
                />
              </Grid>
            </Grid>

            <Grid item xs={12} className={classes.tab}>
              <Paper>
                <Tabs
                  value={state.tabValue}
                  onChange={changeTab}
                  variant='fullWidth'
                  indicatorColor='primary'
                  textColor='primary'
                  centered
                >
                  <Tab label='Details' {...a11yProps(0)} />
                  <Tab label='Characters' {...a11yProps(1)} />
                  <Tab label='Staff' {...a11yProps(2)} />
                </Tabs>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <TabPanel value={state.tabValue} index={0}>
                <Details data={state.data} onClick={props.showEntryDrawer} />
              </TabPanel>
              <TabPanel value={state.tabValue} index={1}>
                <Characters data={state.data} onClick={props.showEntryDrawer} />
              </TabPanel>
              <TabPanel value={state.tabValue} index={2}>
                <Staff data={state.data} onClick={props.showEntryDrawer} />
              </TabPanel>
            </Grid>
          </Grid>
      }
    </>
  );
};

AnimeDetails.propTypes = {
  showEntryDrawer: PropTypes.func.isRequired,
};

export default AnimeDetails;

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`anime-tabpanel-${index}`}
      aria-labelledby={`anime-tab-${index}`}
      {...other}
    >
      {value === index && (
        <>{children}</>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `anime-tab-${index}`,
    'aria-controls': `anime-tabpanel-${index}`,
  };
};

const AnimeDetailsLoading = () => {
  const classes = useStyles();

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} className={classes.loadingCover}>
        <Skeleton variant='rect' height={300} width={200} />
      </Grid>
      <Grid item md xs={12}>
        <Skeleton height={40} width={500} />
        <StyledDivider />
        <Skeleton height={30} />
        <Skeleton height={30} />
        <Skeleton height={30} />
        <Skeleton height={30} width={200} />
        <Grid container spacing={1}>
          {[0, 1, 2, 3].map(i => {
            return (
              <Grid item key={i}>
                <Skeleton height={40} width={70} />
              </Grid>
            )
          })}
        </Grid>
      </Grid>
      <Grid item xs={12} container spacing={1} justify='center' className={classes.stats}>
        {[0, 1, 2, 3, 4].map(i => {
          return (
            <Grid item xs key={i}>
              <Skeleton variant='rect' width={150} height={50} />
            </Grid>
          )
        })}
      </Grid>
      <Grid item xs={12}>
        <Skeleton variant='rect' height={40} />
      </Grid>
      <Grid item md={3} xs={12}>
        <Skeleton height={40} width={100} />
        <StyledDivider />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => {
          return (
            <Skeleton height={30} key={i} />
          )
        })}
      </Grid>
      <Grid item md xs={12} container spacing={1}>
        <Grid item xs={12}>
          <Skeleton height={40} width={100} />
          <StyledDivider />
          <Grid container spacing={1}>
            {[0, 1, 2].map(i => {
              return (
                <Grid item md={4} xs={6} key={i}>
                  <Skeleton variant='rect' height={130} />
                </Grid>
              )
            })}
          </Grid>
        </Grid>
        <Grid item md={6} xs={12}>
          <Skeleton height={40} width={100} />
          <StyledDivider />
          <Skeleton />
          <Skeleton />
        </Grid>
        <Grid item md={6} xs={12}>
          <Skeleton height={40} width={100} />
          <StyledDivider />
          <Skeleton />
          <Skeleton />
        </Grid>
      </Grid>
    </Grid>
  );
};