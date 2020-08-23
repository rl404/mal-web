import React from 'react'
import { SetTitle } from '../../utils'
import Seasonal from './Seasonal'
import Summary from '../../components/drawer/Summary'
import TopList from './TopList'
import * as cons from '../../constant'
import Grid from '@material-ui/core/Grid';
import Total from './Total'
import YearChart from './YearChart'
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import FastForwardIcon from '@material-ui/icons/FastForward';

const Home = () => {
  SetTitle('Home')

  const ref = React.useRef(null);

  const onClick = (id, type) => {
    ref.current.showSummary(id, type);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Total />
      </Grid>
      <Grid item xs={12}>
        <YearChart />
      </Grid>
      <Grid item xs={12}>
        <Seasonal onClick={onClick} />
      </Grid>
      <Grid item xs={12}>
        <TopList topType={cons.ANIME_TOP_AIRING} title='Top Airing Anime' icon={<PlayArrowIcon/>} onClick={onClick} />
      </Grid>
      <Grid item xs={12}>
        <TopList topType={cons.ANIME_TOP_UPCOMING} title='Top Upcoming Anime' icon={<FastForwardIcon/>} onClick={onClick} />
      </Grid>
      <Summary ref={ref} />
    </Grid>
  )
}

export default Home