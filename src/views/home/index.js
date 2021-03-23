import React from 'react';
import Total from './Total';
import Grid from '@material-ui/core/Grid';
import YearChart from './YearChart';
import PropTypes from 'prop-types';
import Top from './Top';
import { getCurrentSeason, setHeadMeta } from '../../utils';
import * as cons from '../../constant';

const Home = (props) => {
  setHeadMeta(false, 'MyAnimeList Drive-Thru', 'Quick access to MyAnimeList content with simpler and more modern style.', '');
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Total />
      </Grid>
      <Grid item xs={12}>
        <YearChart />
      </Grid>
      <Grid item xs={12}>
        <Top
          title='Top Current Season'
          advQuery={{
            season: getCurrentSeason(),
            year: new Date().getFullYear(),
            type: cons.ANIME_TV_ID,
            order: '-score',
          }}
          link={`/search/anime?season=${getCurrentSeason()}&type=${cons.ANIME_TV_ID}&order=-score`}
          showEntryDrawer={props.showEntryDrawer}
          animelist={props.animelist} />
      </Grid>
      <Grid item xs={12}>
        <Top
          title='Top Airing'
          advQuery={{
            status: cons.ANIME_STATUS_AIRING_ID,
            order: '-score',
          }}
          link={`/search/anime?status=${cons.ANIME_STATUS_AIRING_ID}&order=-score`}
          showEntryDrawer={props.showEntryDrawer}
          animelist={props.animelist} />
      </Grid>
      <Grid item xs={12}>
        <Top
          title='Top Upcoming'
          advQuery={{
            status: cons.ANIME_STATUS_NOT_ID,
            order: '-member',
          }}
          link={`/search/anime?status=${cons.ANIME_STATUS_NOT_ID}`}
          showEntryDrawer={props.showEntryDrawer}
          animelist={props.animelist} />
      </Grid>
    </Grid>
  )
};

Home.propTypes = {
  showEntryDrawer: PropTypes.func.isRequired,
  animelist: PropTypes.object,
};

export default Home;