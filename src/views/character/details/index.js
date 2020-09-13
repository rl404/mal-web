import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Skeleton from '@material-ui/lab/Skeleton';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';

import PropTypes from 'prop-types';
import { getEntryDetail } from '../../../api';
import * as cons from '../../../constant';
import Ography from './Ography';
import VoiceActor from './VoiceActor';
import StyledDivider from '../../../components/styled/Divider';
import EllipsisText from '../../../components/text/EllipsisText';
import ErrorArea from '../../../components/error/Error';
import Img from '../../../components/image/Img';

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
  marginTop: {
    marginTop: theme.spacing(2),
  },
  tab: {
    marginBottom: theme.spacing(2),
  },
}));

const CharacterDetails = (props) => {
  const idRef = React.useRef('');
  const [state, setState] = React.useState({
    data: null,
    loading: true,
    altTitle: false,
    tabValue: 0,
    error: null,
  });

  const classes = useStyles(!state.data ? [] : state.data);

  React.useEffect(() => {
    if ((state.data === null && state.error === null) || idRef.current !== props.match.params.id) {
      idRef.current = props.match.params.id;

      const getData = async () => {
        const result = await getEntryDetail(cons.CHAR_TYPE, props.match.params.id)
        if (result.status === cons.CODE_OK) {
          setState({ ...state, data: result.data, loading: false });
        } else {
          setState({ ...state, error: { code: result.status, message: result.message }, loading: false });
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
      {!state ? null : state.loading ? <CharacterDetailsLoading /> :
        state.error !== null ? <ErrorArea code={state.error.code} message={state.error.message} /> :

          <Grid container spacing={1}>
            <Grid item xs={12} className={classes.cover}>
              <Img src={state.data.image} alt={state.data.name} height={300} />
            </Grid>

            <Grid item md xs={12}>
              <Grid container spacing={1}>
                <Grid item xs>
                  <Typography variant="h6">
                    <b>{state.data.name}</b>
                    {state.data.nickname === '' && state.data.kanjiName === '' ? null :
                      <Tooltip title='Alternative titles' placement='right'>
                        <IconButton size='small' onClick={toggleAlt}>
                          <ArrowDropDownIcon />
                        </IconButton>
                      </Tooltip>
                    }
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2" className={classes.favorite}>
                    Favorites: {state.data.favorite.toLocaleString()}
                  </Typography>
                </Grid>
              </Grid>
              <StyledDivider />

              {state.data.nickname === '' || !state.altTitle ? null :
                <Typography variant="subtitle2" className={classes.altTitle}>
                  <span>Nicknames:</span> {state.data.nickname}
                </Typography>
              }
              {state.data.kanjiName === '' || !state.altTitle ? null :
                <Typography variant="subtitle2" className={classes.altTitle}>
                  <span>Japanese Name:</span> {state.data.kanjiName}
                </Typography>
              }

              <Typography variant="subtitle2" className={classes.synopsis}>
                <EllipsisText text={state.data.about} limit={1000} />
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
                  <Tab label='Animeography' {...a11yProps(0)} />
                  <Tab label='Mangaography' {...a11yProps(1)} />
                  <Tab label='Voice Actors' {...a11yProps(2)} />
                </Tabs>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <TabPanel value={state.tabValue} index={0}>
                <Ography type={cons.ANIME_TYPE} data={state.data} onClick={props.showEntryDrawer} />
              </TabPanel>
              <TabPanel value={state.tabValue} index={1}>
                <Ography type={cons.MANGA_TYPE} data={state.data} onClick={props.showEntryDrawer} />
              </TabPanel>
              <TabPanel value={state.tabValue} index={2}>
                <VoiceActor data={state.data} onClick={props.showEntryDrawer} />
              </TabPanel>
            </Grid>
          </Grid>
      }
    </>
  );
};

CharacterDetails.propTypes = {
  showEntryDrawer: PropTypes.func.isRequired,
};

export default CharacterDetails;

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`character-tabpanel-${index}`}
      aria-labelledby={`character-tab-${index}`}
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
    id: `character-tab-${index}`,
    'aria-controls': `character-tabpanel-${index}`,
  };
};

const CharacterDetailsLoading = () => {
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
    </Grid>
  );
};