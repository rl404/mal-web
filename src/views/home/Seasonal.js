import React from 'react'
import Grid from '@material-ui/core/Grid';
import { getSeasonalAnime } from '../../api'
import { getCurrentSeason, isCurrentSeason, capitalize } from '../../utils'
import Entry, { EntryLoading } from '../../components/card/Entry'
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import Skeleton from '@material-ui/lab/Skeleton';
import * as cons from '../../constant'
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  divider: {
    marginBottom: theme.spacing(1)
  },
  viewMore: {
    textAlign: 'right'
  }
}))

const CurrentSeason = getCurrentSeason()
const CurrentYear = new Date().getFullYear()

const Seasonal = (props) => {
  const classes = useStyles();

  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState('')

  React.useEffect(() => {
    const getData = async () => {
      const result = await getSeasonalAnime(CurrentSeason, CurrentYear)
      if (result.status === cons.CODE_OK) {
        const cleanData = []
        result.data.forEach(d => {
          if (d.type === 'TV' && isCurrentSeason(d.startDate)) {
            cleanData.push(d)
          }
        })
        setData(cleanData.slice(0, 5));
      } else {
        setError(result.message)
        console.error(error)
      }
      setLoading(false)
    }
    getData()
  }, [error]);

  if (loading) {
    return (
      <>
        <Typography variant="h5">
          <Skeleton variant="text" width={300} />
        </Typography>
        <Grid container spacing={1}>
          {[0, 1, 2, 3, 4].map(i => {
            return (
              <Grid item key={i} xs>
                <EntryLoading />
              </Grid>
            )
          })}
        </Grid>
      </>
    )
  }

  return (
    <>
      <Grid container>
        <Grid item xs>
          <Typography variant="h6">
            <b>Anime {capitalize(CurrentSeason)} {CurrentYear}</b>
          </Typography>
        </Grid>
        <Grid item className={classes.viewMore} xs>
          <Link to='/anime/seasonal'>
            <Button size="small" color="primary">View more</Button>
          </Link>
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
      <Grid container spacing={1}>
        {data.map(anime => {
          return (
            <Grid item key={anime.id} xs>
              <Entry
                entryId={anime.id}
                entryType={cons.ANIME_TYPE}
                title={anime.title}
                image={anime.image}
                onClick={props.onClick}
              />
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}

export default Seasonal