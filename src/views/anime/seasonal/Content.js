import React from 'react';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import { getSeasonalAnime } from '../../../api';
import { getCurrentSeason } from '../../../utils';
import * as cons from '../../../constant';
import ErrorArea from '../../../components/error/Error';
import CoverCard from '../../../components/card/Cover';
import CoverCardLoading from '../../../components/card/loading/Cover';

const useStyles = makeStyles((theme) => ({
  tabArea: {
    [theme.breakpoints.down('xs')]: {
      background: theme.palette.background.default,
      width: 0,
    },
    position: 'sticky',
    top: 119,
    zIndex: 1,
  },
  tabs: {
    position: 'sticky',
    top: 150,
    zIndex: 1,
    borderRight: `1px solid ${theme.palette.divider}`,
    '& .MuiTab-root': {
      minWidth: 90,
    },
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  tabsMobile: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}));

const SeasonalContent = React.forwardRef((props, ref) => {
  const classes = useStyles();

  const [state, setState] = React.useState({
    data: null,
    loading: true,
    tabValue: 0,
    hentai: false,
    season: {
      season: getCurrentSeason(),
      year: new Date().getFullYear(),
    },
    error: null,
  });

  React.useEffect(() => {
    if ((state.data === null && state.error === null) || state.loading) {
      const getData = async () => {
        const result = await getSeasonalAnime(state.season.season, state.season.year);
        if (result.status === cons.CODE_OK) {
          const splitData = {
            [cons.ANIME_TV_ID]: [],
            [cons.ANIME_ONA_ID]: [],
            [cons.ANIME_OVA_ID]: [],
            [cons.ANIME_MOVIE_ID]: [],
            [cons.ANIME_SPECIAL_ID]: [],
          };
          result.data.forEach(d => {
            if (splitData[d.type] !== undefined) {
              splitData[d.type].push(d);
            }
          });
          setState({ ...state, data: splitData, loading: false });
        } else {
          setState({ ...state, error: { code: result.status, message: result.message }, loading: false });
        }
      }
      getData();
    }
  });

  const tabChange = (e, tabValue) => {
    setState({ ...state, tabValue: tabValue });
  };

  const updateSeasonYear = (season, year) => {
    setState({ ...state, season: { season: season, year: year }, loading: true });
  };

  const setHentai = (h) => {
    setState({ ...state, hentai: h });
  };

  React.useImperativeHandle(ref, () => {
    return {
      updateSeasonYear: updateSeasonYear,
      setHentai: setHentai,
    };
  });

  return (
    <>
      {!state ? null : state.loading ? <AnimeSeasonalLoading /> :
        state.error !== null ? <ErrorArea code={state.error.code} message={state.error.message} /> :
          <>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={2} className={classes.tabArea}>
                <Tabs
                  orientation='vertical'
                  value={state.tabValue}
                  indicatorColor='primary'
                  textColor='primary'
                  onChange={tabChange}
                  className={classes.tabs}
                >
                  {Object.keys(state.data).map((key, i) => {
                    return (
                      <Tab label={cons.ANIME_TYPES[key]} {...a11yProps(i)} key={key} />
                    )
                  })}
                </Tabs>
                <Tabs
                  value={state.tabValue}
                  onChange={tabChange}
                  indicatorColor='primary'
                  textColor='primary'
                  variant='scrollable'
                  scrollButtons='on'
                  className={classes.tabsMobile}
                >
                  {Object.keys(state.data).map((key, i) => {
                    return (
                      <Tab label={cons.ANIME_TYPES[key]} {...a11yProps(i)} key={key} />
                    )
                  })}
                </Tabs>
              </Grid>

              <Grid item sm>
                {Object.keys(state.data).map((key, i) => {
                  return (
                    <TabPanel value={state.tabValue} index={i} key={i}>
                      <Grid container spacing={1}>
                        {state.data[key].map(anime => {
                          var isHentai = anime.rating === cons.ANIME_RATING_RX_ID
                          return (
                            <Grid item key={anime.id} xs style={isHentai && !state.hentai ? { display: 'none' } : null}>
                              <CoverCard
                                id={anime.id}
                                type={cons.ANIME_TYPE}
                                title={anime.title}
                                image={anime.cover}
                                score={anime.score}
                                format={anime.type}
                                onClick={props.onClick}
                              />
                            </Grid>
                          )
                        })}
                      </Grid>
                    </TabPanel>
                  )
                })}
              </Grid>
            </Grid>
          </>
      }
    </>
  );
});

SeasonalContent.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default SeasonalContent;

const a11yProps = (index) => {
  return {
    id: `seasonal-tab-${index}`,
    'aria-controls': `seasonal-tabpanel-${index}`,
  };
};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`seasonal-tabpanel-${index}`}
      aria-labelledby={`seasonal-tab-${index}`}
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

const AnimeSeasonalLoading = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Grid container spacing={1}>
      <Grid item sm={2} className={classes.tabs}>
        <Skeleton variant='rect' height={40} style={{ marginBottom: theme.spacing(1) }} />
        <Skeleton variant='rect' height={40} style={{ marginBottom: theme.spacing(1) }} />
        <Skeleton variant='rect' height={40} style={{ marginBottom: theme.spacing(1) }} />
        <Skeleton variant='rect' height={40} style={{ marginBottom: theme.spacing(1) }} />
        <Skeleton variant='rect' height={40} />
      </Grid>
      {[0, 1, 2, 3, 4].map(i => {
        return (
          <Grid item xs className={classes.tabsMobile} key={i}>
            <Skeleton variant='rect' height={40} />
          </Grid>
        )
      })}
      <Grid item sm>
        <Grid container spacing={1}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => {
            return (
              <Grid item key={i} xs>
                <CoverCardLoading />
              </Grid>
            )
          })}
        </Grid>
      </Grid>
    </Grid>
  );
};