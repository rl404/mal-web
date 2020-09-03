import React from 'react';
import Grid from '@material-ui/core/Grid';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import FastForwardIcon from '@material-ui/icons/FastForward';

import * as cons from '../../constant';
import PropTypes from 'prop-types';
import Seasonal from './Seasonal';
import TopList from './TopList';
import Total from './Total';
import YearChart from './YearChart';

const Home = (props) => {
  // props.setTitle('Home')
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Total />
      </Grid>
      <Grid item xs={12}>
        <YearChart />
      </Grid>
      <Grid item xs={12}>
        <Seasonal showEntryDrawer={props.showEntryDrawer} />
      </Grid>
      <Grid item xs={12}>
        <TopList type={cons.ANIME_TOP_AIRING} title='Top Airing Anime' icon={<PlayArrowIcon />} onClick={props.showEntryDrawer} />
      </Grid>
      <Grid item xs={12}>
        <TopList type={cons.ANIME_TOP_UPCOMING} title='Top Upcoming Anime' icon={<FastForwardIcon />} onClick={props.showEntryDrawer} />
      </Grid>
    </Grid>
  );
};

Home.propTypes = {
  showEntryDrawer: PropTypes.func.isRequired,
};

export default Home;