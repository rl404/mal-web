import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import RefreshIcon from '@material-ui/icons/Refresh';
import CircularProgress from '@material-ui/core/CircularProgress';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { makeStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import { getEntryDetail, reparse } from '../../../api';
import { parseTime } from '../../../utils';
import * as cons from '../../../constant';
import VoiceActor from './VoiceActor';
import Staff from './Staff';
import Manga from './Manga';
import StyledDivider from '../../../components/styled/Divider';
import ErrorArea from '../../../components/error/Error';
import Img from '../../../components/image/Img';
import EllipsisText from '../../../components/text/EllipsisText';

const useStyles = makeStyles((theme) => ({
  cover: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: props => `url(${theme.overlay.image}), url(${props.image})`,
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
    },
  },
  altTitle: {
    color: theme.palette.grey[500],
    '& span': {
      fontWeight: 'bold',
    },
  },
  favorite: {
    marginTop: 5,
  },
  synopsis: {
    whiteSpace: 'pre-wrap',
  },
  tab: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
}));

const PeopleDetails = (props) => {
  const idRef = React.useRef('');
  const [state, setState] = React.useState({
    data: null,
    meta: null,
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
        const result = await getEntryDetail(cons.PEOPLE_TYPE, props.match.params.id);
        if (result.status === cons.CODE_OK) {
          setState({ ...state, data: result.data, meta: result.meta, loading: false });
        } else {
          setState({ ...state, error: { code: result.status, message: result.message }, loading: false });
        }
      }
      getData();
    }
  });

  const changeTab = (event, newValue) => {
    setState({ ...state, tabValue: newValue });
  };

  var timeout = 0;
  const [refreshState, setRefreshState] = React.useState({
    loading: false,
    message: '',
  });
  const onClickRefresh = () => {
    setRefreshState({ ...refreshState, loading: true });

    const refresh = async () => {
      const result = await reparse(cons.PEOPLE_TYPE, props.match.params.id);
      setRefreshState({ loading: false, message: result.message });
    };
    refresh();

    clearTimeout(timeout);
    timeout = setTimeout(() => { setRefreshState({ ...refreshState, message: '' }) }, 5000);
  };

  return (
    <>
      {!state ? null : state.loading ? <PeopleDetailsLoading /> :
        state.error !== null ? <ErrorArea code={state.error.code} message={state.error.message} /> :
          <Grid container spacing={1}>
            <Grid item xs={12} className={classes.cover}>
              <Img src={state.data.image} alt={state.data.name} height={300} />
            </Grid>

            <Grid item md xs={12}>
              <Grid container spacing={1}>
                <Grid item xs>
                  <Typography variant='h6'>
                    <b>{state.data.name}</b>
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant='subtitle2' className={classes.favorite}>
                    Favorites: {state.data.favorite.toLocaleString()}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant='subtitle2' className={classes.favorite}>
                    {refreshState.message}
                  </Typography>
                </Grid>
                <Grid item>
                  <Tooltip placement='bottom-end' title={parseTime(state.meta.parsedAt, 'YYYY-MM-DD HH:mm:ss')}>
                    {refreshState.loading ?
                      <CircularProgress color='inherit' size={15} className={classes.favorite} /> :
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
              <StyledDivider />

              {state.data.givenName === '' ? null :
                <Typography variant='subtitle2' className={classes.synopsis}>
                  Given name: {state.data.givenName}
                </Typography>
              }

              {state.data.familyName === '' ? null :
                <Typography variant='subtitle2' className={classes.synopsis}>
                  Family name: {state.data.familyName}
                </Typography>
              }

              {state.data.alternativeNames.length === 0 ? null :
                <Typography variant='subtitle2' className={classes.synopsis}>
                  Alternative names: {state.data.alternativeNames.join(', ')}
                </Typography>
              }

              <Typography variant='subtitle2' className={classes.synopsis}>
                <EllipsisText text={state.data.more} limit={1000} />
              </Typography>
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
                  <Tab label='Voice Actors' {...a11yProps(0)} />
                  <Tab label='Staff' {...a11yProps(1)} />
                  <Tab label='Published Manga' {...a11yProps(2)} />
                </Tabs>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <TabPanel value={state.tabValue} index={0}>
                <VoiceActor data={state.data} onClick={props.showEntryDrawer} />
              </TabPanel>
              <TabPanel value={state.tabValue} index={1}>
                <Staff data={state.data} onClick={props.showEntryDrawer} />
              </TabPanel>
              <TabPanel value={state.tabValue} index={2}>
                <Manga data={state.data} onClick={props.showEntryDrawer} />
              </TabPanel>
            </Grid>
          </Grid>
      }
    </>
  );
};

PeopleDetails.propTypes = {
  showEntryDrawer: PropTypes.func.isRequired,
};

export default PeopleDetails;

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`people-tabpanel-${index}`}
      aria-labelledby={`people-tab-${index}`}
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
    id: `people-tab-${index}`,
    'aria-controls': `people-tabpanel-${index}`,
  };
};

const PeopleDetailsLoading = () => {
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
      </Grid>

      <Grid item xs={12}>
        <Skeleton variant='rect' height={40} />
      </Grid>
      {[0, 1, 2, 3, 4, 5, 6, 7].map(i => {
        return (
          <Grid item lg={3} md={4} xs={6} key={i}>
            <Skeleton variant='rect' height={130} />
          </Grid>
        )
      })}
    </Grid>
  );
};