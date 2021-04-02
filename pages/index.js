import React from 'react'
import PropTypes from 'prop-types'
import Total from '../views/home/Total'
import Grid from '@material-ui/core/Grid'
import YearChart from '../views/home/YearChart'
import Top from '../views/home/Top'
import { getCurrentSeason, setHeadMeta } from '../lib/utils'
import * as cons from '../lib/constant'
import {
  getSummaryTotal,
  getSummaryYear,
  getSearch
} from '../lib/api'

const Home = (props) => {
  return (
    <>
      {setHeadMeta('MyAnimeList Drive-Thru', 'Quick access to MyAnimeList content with simpler and more modern style.', '')}
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Total result={props.topData} />
        </Grid>
        <Grid item xs={12}>
          <YearChart result={props.yearData} />
        </Grid>
        <Grid item xs={12}>
          <Top
            title='Top Current Season'
            result={props.seasonData}
            link={`/search/anime?season=${getCurrentSeason()}&type=${cons.ANIME_TV_ID}&order=-score`}
            showEntryDrawer={props.showEntryDrawer}
            animelist={props.animelist} />
        </Grid>
        <Grid item xs={12}>
          <Top
            title='Top Airing'
            result={props.airingData}
            link={`/search/anime?status=${cons.ANIME_STATUS_AIRING_ID}&order=-score`}
            showEntryDrawer={props.showEntryDrawer}
            animelist={props.animelist} />
        </Grid>
        <Grid item xs={12}>
          <Top
            title='Top Upcoming'
            result={props.upcomingData}
            link={`/search/anime?status=${cons.ANIME_STATUS_NOT_ID}`}
            showEntryDrawer={props.showEntryDrawer}
            animelist={props.animelist} />
        </Grid>
      </Grid>
    </>
  )
}

export async function getStaticProps() {
  const topData = await getSummaryTotal()
  const yearData = await getSummaryYear()
  const seasonData = await getSearch(cons.ANIME_TYPE, '', 1, 10, {
    season: getCurrentSeason(),
    year: new Date().getFullYear(),
    type: cons.ANIME_TV_ID,
    order: '-score',
  })
  const airingData = await getSearch(cons.ANIME_TYPE, '', 1, 10, {
    status: cons.ANIME_STATUS_AIRING_ID,
    order: '-score',
  })
  const upcomingData = await getSearch(cons.ANIME_TYPE, '', 1, 10, {
    status: cons.ANIME_STATUS_NOT_ID,
    order: '-member',
  })
  return {
    props: {
      topData,
      yearData,
      seasonData,
      airingData,
      upcomingData,
    }
  }
}

Home.propTypes = {
  showEntryDrawer: PropTypes.func.isRequired,
  animelist: PropTypes.object,
}

export default Home