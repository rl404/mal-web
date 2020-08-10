import React from 'react'
import { getEntryDetail } from '../../../api'
import * as cons from '../../../constant'
import { SetTitle, capitalize, parseTime, timeToDuration, parseClock } from '../../../utils'
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid';
import Cover from '../../../components/image/Cover';
import Typography from '@material-ui/core/Typography';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  cover: {
    textAlign: 'center'
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
  link: {
    textDecoration: 'none',
    color: 'black',
    '&:hover': {
      color: theme.palette.primary.main
    }
  }
}));

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
        <Grid item md={3} xs={12} className={classes.cover}>
          <div className={classes.cover}>
            <Cover src={data.cover} alt={data.title} />
          </div>
        </Grid>
        <Grid item md={9} xs={12}>
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
        </Grid>
        <Grid item xs={12} container spacing={1}>
          <Grid item xs>
            <Typography variant="subtitle2" align="center" className={classes.categoryName}>
              Rank
              </Typography>
            <Typography variant="h6" align="center">
              <b>#{data.rank.toLocaleString()}</b>
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography variant="subtitle2" align="center" className={classes.categoryName}>
              Score
          </Typography>
            <Typography variant="h6" align="center">
              <Tooltip title={data.voter.toLocaleString() + ' voters'}>
                <b>{Number(data.score).toFixed(2)}</b>
              </Tooltip>
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography variant="subtitle2" align="center" className={classes.categoryName}>
              Popularity
          </Typography>
            <Typography variant="h6" align="center">
              <b>#{data.popularity.toLocaleString()}</b>
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography variant="subtitle2" align="center" className={classes.categoryName}>
              Members
          </Typography>
            <Typography variant="h6" align="center">
              <b>{data.member.toLocaleString()}</b>
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography variant="subtitle2" align="center" className={classes.categoryName}>
              Favorites
          </Typography>
            <Typography variant="h6" align="center">
              <b>{data.favorite.toLocaleString()}</b>
            </Typography>
          </Grid>
        </Grid>
        <Grid item md={2} xs={12} container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              <b>Information</b>
            </Typography>
            <Divider className={classes.divider} />
          </Grid>
          <Grid item md={12} xs={3}>
            <Typography variant="caption" paragraph>
              <b>Type:</b><br />
              {data.type}
            </Typography>
          </Grid>
          <Grid item md={12} xs={3}>
            <Typography variant="caption" paragraph>
              <b>Episodes:</b><br />
              {data.episode}
            </Typography>
          </Grid>
          <Grid item md={12} xs={3}>
            <Typography variant="caption" paragraph>
              <b>Status:</b><br />
              {data.status}
            </Typography>
          </Grid>
          <Grid item md={12} xs={3}>
            <Typography variant="caption" paragraph>
              <b>Start Date:</b><br />
              {parseTime(data.airing.start, "MMM D, YYYY") !== '' ? parseTime(data.airing.start, "MMM D, YYYY") : '?'}
            </Typography>
          </Grid>
          {data.episode === 1 ? null : (
            <Grid item md={12} xs={3}>
              <Typography variant="caption" paragraph>
                <b>End Date:</b><br />
                {parseTime(data.airing.end, "MMM D, YYYY") !== '' ? parseTime(data.airing.end, "MMM D, YYYY") : '?'}
              </Typography>
            </Grid>
          )}
          {data.type !== cons.ANIME_TV ? null : (
            <Grid item md={12} xs={3}>
              <Typography variant="caption" paragraph>
                <b>Season:</b><br />
                {data.premiered === '' ? '?' : capitalize(data.premiered)}
              </Typography>
            </Grid>
          )}
          <Grid item md={12} xs={3}>
            <Typography variant="caption" paragraph>
              <b>Duration:</b><br />
              {timeToDuration(data.duration)}
            </Typography>
          </Grid>
          {data.type !== cons.ANIME_TV ? null : (
            <Grid item md={12} xs={3}>
              <Typography variant="caption" paragraph>
                <b>Broadcast:</b><br />
                {data.airing.day === '' ? '?' : capitalize(data.airing.day) + ' ' + parseClock(data.airing.time, 'HH:mm:ss').format('HH:mm')}
              </Typography>
            </Grid>
          )}
          <Grid item md={12} xs={3}>
            <Typography variant="caption" paragraph>
              <b>Studios:</b><br />
              {!data.studios || data.studios.length === 0 ? '?' : data.studios
                .map((p) => <Link to="" key={p.id} className={classes.link}>{p.name}</Link>)
                .reduce((prev, curr) => [prev, ", ", curr])
              }
            </Typography>
          </Grid>
          <Grid item md={12} xs={3}>
            <Typography variant="caption" paragraph>
              <b>Producers:</b><br />
              {!data.producers || data.producers.length === 0 ? '?' : data.producers
                .map((p) => <Link to="" key={p.id} className={classes.link}>{p.name}</Link>)
                .reduce((prev, curr) => [prev, ", ", curr])
              }
            </Typography>
          </Grid>
          <Grid item md={12} xs={3}>
            <Typography variant="caption" paragraph>
              <b>Licensors:</b><br />
              {!data.licensors || data.licensors.length === 0 ? '?' : data.licensors
                .map((p) => <Link to="" key={p.id} className={classes.link}>{p.name}</Link>)
                .reduce((prev, curr) => [prev, ", ", curr])
              }
            </Typography>
          </Grid>
          <Grid item md={12} xs={3}>
            <Typography variant="caption" paragraph>
              <b>Source:</b><br />
              {data.source}
            </Typography>
          </Grid>
          <Grid item md={12} xs={3}>
            <Typography variant="caption" paragraph>
              <b>Rating:</b><br />
              {data.rating}
            </Typography>
          </Grid>
        </Grid>
        <Grid item md={10} xs={12}>
          qqdasd
        </Grid>
      </Grid>
    </>
  )
}

export default AnimeDetails