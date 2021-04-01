import React from 'react'
import * as cons from '../../lib/constant'
import PropTypes from 'prop-types'
import Error from '../../components/error/Error'
import Grid from '@material-ui/core/Grid'
import { useMediaQuery, useTheme } from '@material-ui/core'
import StyledTitle from '../../components/styled/Title'
import BarChartIcon from '@material-ui/icons/BarChart'
import TimelineIcon from '@material-ui/icons/Timeline'
import BarChart from '../../components/chart/BarChart'
import LineChart from '../../components/chart/LineChart'

const YearChart = ({ result }) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('xs'))

  if (result.status !== cons.CODE_OK) {
    return <Error code={result.status} message={result.message} />
  }

  return (
    <Grid container spacing={1}>
      <Grid item md={6} xs={12}>
        <StyledTitle icon={<BarChartIcon />} title='Anime Count' />
        <BarChart
          data={result.data.slice(matches ? -5 : -10).map(d => {
            return {
              key: d.anime.year.toString(),
              value: d.anime.count,
            }
          })}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <StyledTitle icon={<BarChartIcon />} title='Manga Count' />
        <BarChart
          data={result.data.slice(matches ? -5 : -10).map(d => {
            return {
              key: d.manga.year.toString(),
              value: d.manga.count,
            }
          })}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <StyledTitle icon={<TimelineIcon />} title='Anime Score' />
        <LineChart
          float
          data={result.data.slice(matches ? -5 : -10).map(d => {
            return {
              key: d.anime.year.toString(),
              value: d.anime.avgScore,
            }
          })}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <StyledTitle icon={<TimelineIcon />} title='Manga Score' />
        <LineChart
          float
          data={result.data.slice(matches ? -5 : -10).map(d => {
            return {
              key: d.manga.year.toString(),
              value: d.manga.avgScore,
            }
          })}
        />
      </Grid>
    </Grid>
  )
}

YearChart.propTypes = {
  result: PropTypes.object.isRequired,
}

export default YearChart
