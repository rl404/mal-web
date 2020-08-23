import React from 'react'
import { getEntryDetail } from '../../../api'
import * as cons from '../../../constant'
import { SetTitle, capitalize } from '../../../utils'
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Chip from '@material-ui/core/Chip';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PersonIcon from '@material-ui/icons/Person';
import FavoriteIcon from '@material-ui/icons/Favorite';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import AssessmentIcon from '@material-ui/icons/Assessment';
import Details from './Details';
import Stats from '../../../components/card/Stats';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  cover: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: props => 'url(/images/white.png), url(' + props.cover + ')',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    [theme.breakpoints.up('md')]: {
      maxWidth: 260,
      backgroundClip: 'padding-box',
      borderTop: '6px solid transparent',
      borderBottom: '2px solid transparent',
      borderRight: '18px solid transparent',
      borderLeft: '18px solid transparent'
    },
  },
  divider: {
    marginBottom: theme.spacing(1)
  },
  altTitle: {
    color: theme.palette.grey[500],
    '& span': {
      fontWeight: 'bold'
    }
  },
  synopsis: {
    whiteSpace: 'pre-wrap'
  },
  genre: {
    margin: 2
  },
  stats: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  tab: {
    marginBottom: theme.spacing(2),
  }
}));

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
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

const a11yProps = (index) => {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const AnimeDetails = (props) => {
  const entryId = props.match.params.id

  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState('')
  const classes = useStyles(data);

  React.useEffect(() => {
    const getData = async () => {
      const result = await getEntryDetail(cons.ANIME_TYPE, entryId)
      if (result.status === cons.CODE_OK) {
        setData(result.data);
      } else {
        setError(result.message)
        console.error(error)
      }
      setLoading(false)
      SetTitle(result.data.title)
    }
    getData()
  }, [entryId, error]);

  const [altState, setAltState] = React.useState(false)
  const toggleAlt = () => {
    setAltState(!altState)
  }

  const [tabValue, setTabValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (loading) {
    return (
      <>
        eiei
      </>
    )
  }

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} className={classes.cover}>
          <img src={data.cover} alt={data.title} />
        </Grid>
        <Grid item md xs={12}>
          <Typography variant="h6">
            <b>{data.title}</b>
            <Tooltip title="Alternative titles" placement="right">
              <IconButton size='small' onClick={toggleAlt}>
                <ArrowDropDownIcon />
              </IconButton>
            </Tooltip>
          </Typography>
          <Divider className={classes.divider} />
          {Object.keys(data.alternativeTitles).map(key => {
            if (data.alternativeTitles[key] === '' || !altState) {
              return null
            } else {
              return (
                <Typography variant="subtitle2" key={key} className={classes.altTitle}>
                  <span>{capitalize(key)}:</span> {data.alternativeTitles[key]}
                </Typography>
              )
            }
          })}
          <Typography variant="subtitle2" className={classes.synopsis}>
            {data.synopsis}
          </Typography>
          {data.genres.map(genre => {
            return (
              <Chip size="small" label={genre.name} color="primary" key={genre.id} className={classes.genre} />
            )
          })}
        </Grid>
        <Grid item xs={12} container spacing={1} justify="center" className={classes.stats}>
          <Grid item xs>
            <Stats
              width={200}
              icon={<EqualizerIcon />}
              data={'#' + data.rank.toLocaleString()}
              name='Rank'
            />
          </Grid>
          <Grid item xs>
            <Stats
              width={200}
              icon={<AssessmentIcon />}
              data={
                <Tooltip title={data.voter.toLocaleString() + ' voters'} placement="top">
                  <b>{Number(data.score).toFixed(2)}</b>
                </Tooltip>}
              name='Score'
            />
          </Grid>
          <Grid item xs>
            <Stats
              width={200}
              icon={<ThumbUpIcon />}
              data={'#' + data.popularity.toLocaleString()}
              name='Popularity'
            />
          </Grid>
          <Grid item xs>
            <Stats
              width={200}
              icon={<PersonIcon />}
              data={data.member.toLocaleString()}
              name='Members'
            />
          </Grid>
          <Grid item xs>
            <Stats
              width={200}
              icon={<FavoriteIcon />}
              data={data.favorite.toLocaleString()}
              name='Favorites'
            />
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.tab}>
          <Paper>
            <Tabs
              value={tabValue}
              onChange={handleChange}
              variant="fullWidth"
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="Details" {...a11yProps(0)} />
              <Tab label="Stats" {...a11yProps(1)} />
              <Tab label="Characters" {...a11yProps(2)} />
              <Tab label="Staff" {...a11yProps(3)} />
            </Tabs>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <TabPanel value={tabValue} index={0}>
            <Details data={data} />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            destat
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            categoryName
          </TabPanel>
          <TabPanel value={tabValue} index={3}>
            staff
          </TabPanel>
        </Grid>
      </Grid>
    </>
  )
}

export default AnimeDetails