import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Divider from '@material-ui/core/Divider';
import Skeleton from '@material-ui/lab/Skeleton';
import RefreshIcon from '@material-ui/icons/Refresh';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import Form from './form';
import * as cons from '../../../constant';
import { parseTime } from '../../../utils';
import { getUser, reparseUser } from '../../../api';
import ErrorArea from '../../../components/error/Error';
import Img from '../../../components/image/Img';
import Stats from './stats';
import List from './list';

const useStyles = makeStyles((theme) => ({
  cover: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    flexDirection: 'column',
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
  username: {
    marginTop: theme.spacing(2),
  },
  tabArea: {
    width: 0,
  },
}));

const Profile = (props) => {
  const userRef = React.useRef('');
  const [state, setState] = React.useState({
    username: props.match.params.username ? props.match.params.username : '',
    data: null,
    meta: null,
    loading: true,
    error: null,
    tabValue: 0,
  });

  var classes = useStyles(!state.data ? [] : state.data);

  React.useEffect(() => {
    const urlUsername = props.match.params.username ? props.match.params.username : '';
    if ((state.data === null && state.error === null) || userRef.current !== urlUsername) {
      userRef.current = urlUsername;

      const getUserData = async () => {
        const result = await getUser(urlUsername);
        if (result.status === cons.CODE_OK) {
          setState({ ...state, data: result.data, meta: result.meta, loading: false });
          saveToRecent(result.data.username);
        } else {
          setState({ ...state, error: { code: result.status, message: result.message }, loading: false });
        }
      }

      if (userRef.current !== '') {
        getUserData();
      }
    }
  });

  const saveToRecent = (username) => {
    const recentUsers = localStorage.getItem('recentUser');
    if (!recentUsers) {
      localStorage.setItem('recentUser', JSON.stringify([username]));
      return
    }

    var arrUser = JSON.parse(recentUsers);
    var isDuplicate = false;
    arrUser.forEach(u => {
      if (u === username) {
        isDuplicate = true;
      }
    })
    if (!isDuplicate) {
      arrUser.push(username);
      localStorage.setItem('recentUser', JSON.stringify(arrUser.slice(-10)));
    }
  }

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
      const result = await reparseUser(userRef.current);
      setRefreshState({ loading: false, message: result.message });
    };
    refresh();

    clearTimeout(timeout);
    timeout = setTimeout(() => { setRefreshState({ ...refreshState, message: '' }) }, 5000);
  };

  return (
    state.username === '' ? <Form /> :
      !state ? null : state.loading ? <ProfileLoading /> :
        state.error !== null ? <ErrorArea code={state.error.code} message={state.error.message} /> :
          <Grid container spacing={1}>
            <Grid item xs={12} md={3}>
              <Grid container spacing={2}>
                <Grid xs={12} item className={classes.cover}>
                  <Img src={state.data.image} alt={state.data.username} height={300} />
                  <Typography variant='h5' className={classes.username}>
                    <b>{state.data.username}</b>
                  </Typography>
                </Grid>
                <Grid xs={12} item align='center'>
                  <Tooltip placement='left' title={parseTime(state.meta.parsedAt, 'YYYY-MM-DD HH:mm:ss')}>
                    {refreshState.loading ?
                      <CircularProgress color='inherit' size={15} className={classes.message} /> :
                      <IconButton size='small' onClick={onClickRefresh}>
                        <RefreshIcon />
                      </IconButton>
                    }
                  </Tooltip>
                  <a href={`${cons.MAL_URL}/profile/${state.data.username}`} target='_blank' rel='noopener noreferrer'>
                    <Tooltip placement='right' title='MyAnimeList Page'>
                      <IconButton size='small'>
                        <OpenInNewIcon />
                      </IconButton>
                    </Tooltip>
                  </a>
                </Grid>
                <Grid item xs={12} align='center'>
                  <Typography variant='subtitle2' className={classes.message}>
                    {refreshState.message}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={9} container spacing={1} justify="flex-start" alignItems="flex-start">
              <Grid item xs={12} className={classes.tabArea}>
                <Tabs
                  value={state.tabValue}
                  onChange={changeTab}
                  indicatorColor='primary'
                  textColor='primary'
                  variant='scrollable'
                  scrollButtons='on'
                >
                  <Tab label='Anime Stats' {...a11yProps(0)} />
                  <Tab label='Manga Stats' {...a11yProps(1)} />
                  <Tab label='Anime List' {...a11yProps(2)} />
                  <Tab label='Manga List' {...a11yProps(3)} />
                </Tabs>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <TabPanel value={state.tabValue} index={0}>
                  <Stats username={state.data.username} type={cons.ANIME_TYPE} onClick={props.showEntryDrawer} />
                </TabPanel>
                <TabPanel value={state.tabValue} index={1}>
                  <Stats username={state.data.username} type={cons.MANGA_TYPE} onClick={props.showEntryDrawer} />
                </TabPanel>
                <TabPanel value={state.tabValue} index={2}>
                  <List username={state.data.username} type={cons.ANIME_TYPE} onClick={props.showEntryDrawer} />
                </TabPanel>
                <TabPanel value={state.tabValue} index={3}>
                  <List username={state.data.username} type={cons.MANGA_TYPE} onClick={props.showEntryDrawer} />
                </TabPanel>
              </Grid>
            </Grid>
          </Grid>
  )
};

export default Profile;

Profile.propTypes = {
  showEntryDrawer: PropTypes.func.isRequired,
};

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

const ProfileLoading = () => {
  const classes = useStyles();

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={3} container spacing={2}>
        <Grid item xs={12} className={classes.cover}>
          <Skeleton variant='rect' height={300} width={200} />
        </Grid>
        <Grid item xs={12} align='center'>
          <Typography variant='h5'>Retrieving data...</Typography>
          <Divider />
        </Grid>
        <Grid item xs={6} align='center'>
          <Skeleton height={40} />
        </Grid>
        <Grid item xs={6} align='center'>
          <Skeleton height={40} />
        </Grid>
      </Grid>
      <Grid item xs={12} md={9} container spacing={1} justify="flex-start" alignItems="flex-start">
        <Grid item>
          <Skeleton height={40} width={150} />
          <Divider />
        </Grid>
        <Grid item xs>
          <Skeleton height={40} width={150} />
          <Divider />
        </Grid>
      </Grid>
    </Grid>
  );
}