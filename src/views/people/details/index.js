import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import { getEntryDetail } from '../../../api';
import * as cons from '../../../constant';
import VoiceActor from './VoiceActor';
import Staff from './Staff';
import Manga from './Manga';
import StyledDivider from '../../../components/styled/Divider';
import ErrorArea from '../../../components/error/Error';

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
          setState({ ...state, data: result.data, loading: false });
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

  return (
    <>
      {!state ? null : state.loading ? <PeopleDetailsLoading /> :
        state.error !== null ? <ErrorArea code={state.error.code} message={state.error.message} /> :
          <Grid container spacing={1}>
            <Grid item xs={12} className={classes.cover}>
              <img src={state.data.image} alt={state.data.name} />
            </Grid>

            <Grid item md xs={12}>
              <Grid container spacing={1}>
                <Grid item xs>
                  <Typography variant="h6">
                    <b>{state.data.name}</b>
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2" className={classes.favorite}>
                    Favorites: {state.data.favorite.toLocaleString()}
                  </Typography>
                </Grid>
              </Grid>
              <StyledDivider />

              {state.data.givenName === '' ? null :
                <Typography variant="subtitle2" className={classes.synopsis}>
                  Given name: {state.data.givenName}
                </Typography>
              }

              {state.data.familyName === '' ? null :
                <Typography variant="subtitle2" className={classes.synopsis}>
                  Family name: {state.data.familyName}
                </Typography>
              }

              {state.data.alternativeNames.length === 0 ? null :
                <Typography variant="subtitle2" className={classes.synopsis}>
                  Alternative names: {state.data.alternativeNames.join(", ")}
                </Typography>
              }

              <Typography variant="subtitle2" className={classes.synopsis}>
                {state.data.more}
              </Typography>
            </Grid>

            <Grid item xs={12} className={classes.tab}>
              <Paper>
                <Tabs
                  value={state.tabValue}
                  onChange={changeTab}
                  variant="fullWidth"
                  indicatorColor="primary"
                  textColor="primary"
                  centered
                >
                  <Tab label="Voice Actors" {...a11yProps(0)} />
                  <Tab label="Staff" {...a11yProps(1)} />
                  <Tab label="Published Manga" {...a11yProps(2)} />
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
      role="tabpanel"
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
        <Skeleton variant="rect" height={40} />
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