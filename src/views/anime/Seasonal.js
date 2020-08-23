import React from 'react'
import Grid from '@material-ui/core/Grid';
import { getSeasonalAnime } from '../../api'
import { SetTitle, getCurrentSeason, capitalize } from '../../utils'
import Entry, { EntryLoading } from '../../components/card/Entry'
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider'
import Skeleton from '@material-ui/lab/Skeleton';
import * as cons from '../../constant'
import { makeStyles } from '@material-ui/core/styles';
import Summary from '../../components/drawer/Summary'
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import EcoIcon from '@material-ui/icons/Eco';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  divider: {
    marginBottom: theme.spacing(1)
  },
  tabArea: {
    minWidth: 100
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    '& .MuiTab-root': {
      minWidth: 90
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
  seasonInput: {
    verticalAlign: 'middle',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    '& .MuiInputBase-root': {
      fontFamily: theme.typography.h6.fontFamily,
      fontWeight: theme.typography.h6.fontWeight,
      fontSize: theme.typography.h6.fontSize,
      lineHeight: theme.typography.h6.lineHeight,
      letterSpacing: theme.typography.h6.letterSpacing,
      '&::before': {
        border: 'none'
      },
      '& .MuiInputBase-input': {
        textAlign: 'center',
        padding: 0,
        // width: 110 // with svg
        width: 82
      }
    },
    '& svg': {
      display: 'none'
    }
  },
  yearInput: {
    verticalAlign: 'middle',
    '& .MuiInputBase-root': {
      fontFamily: theme.typography.h6.fontFamily,
      fontWeight: 'bold',
      fontSize: theme.typography.h6.fontSize,
      lineHeight: theme.typography.h6.lineHeight,
      letterSpacing: theme.typography.h6.letterSpacing,
      '&::before': {
        border: 'none',
        bottom: -4
      },
      '&::after': {
        bottom: -4
      },
      '& .MuiInputBase-input': {
        textAlign: 'center',
        padding: 0,
        width: 50
      }
    }
  }
}))

const CurrentSeason = getCurrentSeason()
const CurrentYear = new Date().getFullYear()

const a11yProps = (index) => {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <>{children}</>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const AnimeSeasonal = () => {
  SetTitle('Seasonal Anime')

  const classes = useStyles();

  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState('')
  const [tabValue, setTabValue] = React.useState(0);
  const [hentai, setHentai] = React.useState(false)
  const [seasonYear, setSeasonYear] = React.useState({
    season: CurrentSeason,
    year: CurrentYear
  })

  const ref = React.useRef(null);

  const onClick = (id, type) => {
    ref.current.showSummary(id, type);
  };

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const updateSeasonYear = (season, year) => {
    setSeasonYear({ season: season, year: year })
  }

  const toggleHentai = () => {
    setHentai(!hentai)
  }

  React.useEffect(() => {
    const getData = async (season, year) => {
      setLoading(true)
      const result = await getSeasonalAnime(season, year)
      if (result.status === cons.CODE_OK) {
        const splitData = {
          [cons.ANIME_TV]: [],
          [cons.ANIME_ONA]: [],
          [cons.ANIME_OVA]: [],
          [cons.ANIME_MOVIE]: [],
          [cons.ANIME_SPECIAL]: []
        }
        result.data.forEach(d => {
          if (splitData.[d.type] !== undefined) {
            splitData.[d.type].push(d)
          }
        })
        setData(splitData);
      } else {
        setError(result.message)
        console.error(error)
      }
      setLoading(false)
    }
    getData(seasonYear.season, seasonYear.year)
  }, [seasonYear, error]);

  if (loading) {
    return (
      <>
        <SeasonSelect onChange={updateSeasonYear} season={seasonYear.season} year={seasonYear.year} />
        <Divider className={classes.divider} />
        <Grid container spacing={1}>
          <Grid item sm={2} className={classes.tabs}>
            <Skeleton height={40} />
            <Skeleton height={40} />
            <Skeleton height={40} />
            <Skeleton height={40} />
            <Skeleton height={40} />
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
                    <EntryLoading />
                  </Grid>
                )
              })}
            </Grid>
          </Grid>
        </Grid>
      </>
    )
  }

  return (
    <>
      <SeasonSelect onChange={updateSeasonYear} season={seasonYear.season} year={seasonYear.year} hentaiState={hentai} onCheck={toggleHentai} />
      <Divider className={classes.divider} />
      <Grid container spacing={1}>
        <Grid item xs={12} sm={2} className={classes.tabArea}>
          <Tabs
            orientation="vertical"
            value={tabValue}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            className={classes.tabs}
          >
            {Object.keys(data).map((key, i) => {
              return (
                <Tab label={key} {...a11yProps(i)} key={key} />
              )
            })}
          </Tabs>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            className={classes.tabsMobile}
          >
            {Object.keys(data).map((key, i) => {
              return (
                <Tab label={key} {...a11yProps(i)} key={key} />
              )
            })}
          </Tabs>
        </Grid>
        <Grid item sm>
          {Object.keys(data).map((key, i) => {
            return (
              <TabPanel value={tabValue} index={i} key={i}>
                <Grid container spacing={1}>
                  {data[key].map(anime => {
                    var isHentai = anime.rating.includes('Hentai')
                    return (
                      <Grid item key={anime.id} xs style={isHentai && !hentai ? { display: 'none' } : null}>
                        <Entry
                          entryId={anime.id}
                          entryType={cons.ANIME_TYPE}
                          title={anime.title}
                          image={anime.cover}
                          onClick={onClick}
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
      <Summary ref={ref} />
    </>
  )
}

export default AnimeSeasonal

const SeasonSelect = (props) => {
  const classes = useStyles()

  const handleSeasonChange = (e) => {
    props.onChange(e.target.value, props.year)
  }
  const handleYearChange = (e) => {
    var year = e.target.value
    if (year.length === 4 && parseInt(year) !== props.year) {
      props.onChange(props.season, year)
    }
  }

  const [hentai] = React.useState(props.hentaiState)
  const handleHentaiChange = (e) => {
    props.onCheck(e.target.checked)
  }

  var icon = ''
  switch (props.season) {
    case cons.SEASON_WINTER:
      icon = <AcUnitIcon />
      break
    case cons.SEASON_SPRING:
      icon = <LocalFloristIcon />
      break
    case cons.SEASON_SUMMER:
      icon = <BeachAccessIcon />
      break
    case cons.SEASON_FALL:
      icon = <EcoIcon />
      break
    default:
  }

  return (
    <Grid container direction="row" alignItems="center" spacing={1}>
      <Grid item>
        {icon}
      </Grid>
      <Grid item xs>
        <Typography variant="h6">
          <b>
            Anime
            <TextField
              select
              value={props.season}
              onChange={handleSeasonChange}
              size="small"
              className={classes.seasonInput}
            >
              {cons.SEASONS.map((s) => (
                <MenuItem key={s} value={s}>
                  <b>{capitalize(s)}</b>
                </MenuItem>
              ))}
            </TextField>
            <TextField
              defaultValue={props.year}
              onChange={handleYearChange}
              size="small"
              className={classes.yearInput} />
          </b>
        </Typography>
      </Grid>
      <Grid item>
        <FormControlLabel
          control={<Checkbox checked={hentai}
            onChange={handleHentaiChange}
            name="hentai"
            color="primary" />}
          label="R18+"
        />
      </Grid>
    </Grid>

  )
}