import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { getYearlyScore } from '../../api';
import * as cons from '../../constant'
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider'
import BarChart from '../../components/chart/BarChart';
import LineChart from '../../components/chart/LineChart';
import BarChartIcon from '@material-ui/icons/BarChart';
import TimelineIcon from '@material-ui/icons/Timeline';

const useStyles = makeStyles((theme) => ({
  divider: {
    marginBottom: theme.spacing(1)
  },
}))

const YearChart = () => {
  const classes = useStyles();
  const theme = useTheme();

  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState('')

  React.useEffect(() => {
    const getData = async () => {
      const result = await getYearlyScore()
      if (result.status === cons.CODE_OK) {
        setData(result.data);
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
      <Grid container spacing={1}>
        {[0, 1, 2, 3].map(key => {
          return (
            <Grid item md={6} xs={12} key={key}>
              <Typography variant="h6">
                <Skeleton variant="text" width={150} />
              </Typography>
              <Divider className={classes.divider} />
              <Skeleton variant="rect" height={200} />
            </Grid>
          )
        })}
      </Grid>
    )
  }

  return (
    <Grid container spacing={1}>
      <Grid item md={6} xs={12} >
        <Grid container direction="row" alignItems="center" spacing={1}>
          <Grid item>
            <BarChartIcon />
          </Grid>
          <Grid item>
            <Typography variant="h6">
              <b>Anime Count</b>
            </Typography>
          </Grid>
        </Grid>

        <Divider className={classes.divider} />
        <BarChart
          data={Object.keys(data).map(key => {
            return {
              year: key,
              count: data[key].anime.count,
            }
          }).slice(-10)}
          height={200}
          valueField="count"
          argumentField="year"
          color={theme.palette.primary.main}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <Grid container direction="row" alignItems="center" spacing={1}>
          <Grid item>
            <BarChartIcon />
          </Grid>
          <Grid item>
            <Typography variant="h6">
              <b>Manga Count</b>
            </Typography>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <BarChart
          data={Object.keys(data).map(key => {
            return {
              year: key,
              count: data[key].manga.count,
            }
          }).slice(-10)}
          height={200}
          valueField="count"
          argumentField="year"
          color={theme.palette.primary.main}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <Grid container direction="row" alignItems="center" spacing={1}>
          <Grid item>
            <TimelineIcon />
          </Grid>
          <Grid item>
            <Typography variant="h6">
              <b>Anime Score</b>
            </Typography>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <LineChart
          data={Object.keys(data).map(key => {
            return {
              year: key,
              score: data[key].anime.avgScore,
            }
          }).slice(-10)}
          height={200}
          valueField="score"
          argumentField="year"
          color={theme.palette.primary.main}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <Grid container direction="row" alignItems="center" spacing={1}>
          <Grid item>
            <TimelineIcon />
          </Grid>
          <Grid item>
            <Typography variant="h6">
              <b>Manga Score</b>
            </Typography>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <LineChart
          data={Object.keys(data).map(key => {
            return {
              year: key,
              score: data[key].manga.avgScore,
            }
          }).slice(-10)}
          height={200}
          valueField="score"
          argumentField="year"
          color={theme.palette.primary.main}
        />
      </Grid>
    </Grid>
  )
}

export default YearChart